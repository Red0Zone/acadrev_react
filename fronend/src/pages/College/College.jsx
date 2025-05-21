import React, { useState, useMemo, useEffect } from 'react';
// Ensure fetchMyCollege is imported
import { fetchColleges, editCollege, fetchUniversities, fetchCollegesByUniversity, fetchMyCollege } from './functions'; 
import CollegeAdminView from './CollegeAdminView';
import CollegeStaffView from './CollegeStaffView';
import CollegePopup from './components/CollegeModal';
import { useAuth } from '../../context/AuthContext';

// Custom Debounce Hook for Search Optimization
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const College = () => {
  const { user } = useAuth(); 
  const userRole = user?.role;

  const [universitiesList, setUniversitiesList] = useState([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [universitiesError, setUniversitiesError] = useState(null);
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  // Apply debounce to search term with 300ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [currentColleges, setCurrentColleges] = useState([]);
  const [loading, setLoading] = useState(true); // For colleges
  const [error, setError] = useState(null); // For colleges

  useEffect(() => {
    const loadUniversitiesData = async () => {
      if (userRole === 'admin' || userRole === 'authority') {
        try {
          setUniversitiesLoading(true);
          setUniversitiesError(null);
          const data = await fetchUniversities();
          setUniversitiesList(data);
          
        } catch (err) {
          setUniversitiesError(err.message || 'Failed to fetch universities.');
          setUniversitiesList([]);
        } finally {
          setUniversitiesLoading(false);
        }
      } else {
        setUniversitiesList([]);
        setUniversitiesLoading(false);
        setUniversitiesError(null); 
      }
    };
    loadUniversitiesData();
  }, [userRole]);

  useEffect(() => {
    const loadCollegesData = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;

        if (userRole === 'university') {
          // For university role, fetch colleges associated with their universityId
          if (user.role === 'university') { // Ensure universityId is available
            data = await fetchCollegesByUniversity(user.university_id);
          } else {
            console.warn("University user does not have a universityId. Cannot fetch their colleges.");
            data = [];
          }
        } else if (userRole === 'admin' || userRole === 'authority') {
          // For admin/authority, fetch based on selectedUniversityId or all if none selected
          const params = selectedUniversityId ? { universityId: selectedUniversityId } : {};
          data = await fetchColleges(params);
        } else if (userRole === 'college' || userRole === 'department') {
          // For college/department roles, fetch their specific college/department data
          const myCollegeData = await fetchMyCollege(); // Assumes fetchMyCollege gets data based on token
          data = myCollegeData ? [myCollegeData] : []; // Wrap single object in an array
        } else {
          // Fallback for other roles or if no specific logic is defined
          // This might fetch all colleges they are permitted to see, or none.
          // Adjust fetchColleges({}) if a more specific behavior is needed for other roles.
          console.warn(`No specific college fetching logic for role: ${userRole}. Fetching general list.`);
          data = await fetchColleges({}); 
        }
        
        setCurrentColleges(Array.isArray(data) ? data : (data ? [data] : []));
      } catch (err) {
        console.error(`Error fetching colleges for role ${userRole}:`, err);
        setError(err.message || 'Failed to fetch colleges.');
        setCurrentColleges([]);
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
        loadCollegesData();
    } else {
        setLoading(false);
        setCurrentColleges([]);
    }
    // Dependencies: userRole, selectedUniversityId (for admin/authority), 
    // and user.universityId (for university role).
    // user object itself can be a dependency if other parts of it influence data fetching for other roles.
  }, [userRole, selectedUniversityId, user?.university_id, user]); // Added user to dependencies as userRole and user.universityId come from it.

  const universityCodeMap = useMemo(() => {
    if (userRole === 'admin' || userRole === 'authority') {
      return universitiesList.reduce((map, uni) => {
        map[uni.id] = uni.code;
        return map;
      }, {});
    }
    return {};
  }, [universitiesList, userRole]);

  const selectedUniversityForContext = useMemo(() => {
    if (userRole === 'admin' || userRole === 'authority') {
      return universitiesList.find(uni => uni.id === selectedUniversityId);
    }
    return null;
  }, [selectedUniversityId, universitiesList, userRole]);

  const filteredColleges = useMemo(() => {
    let collegesToProcess = [...currentColleges];

    // For 'admin' or 'authority' roles, if a university is selected, filter client-side.
    // This client-side filter is only applied if the backend didn't already filter by universityId for these roles.
    // If fetchColleges for admin/authority already filters by selectedUniversityId on the backend, this might be redundant
    // or could be removed if currentColleges is always correctly scoped from the backend.
    if ((userRole === 'admin' || userRole === 'authority') && selectedUniversityId) {
      // This assumes currentColleges might contain colleges from multiple universities if selectedUniversityId is null
      collegesToProcess = collegesToProcess.filter(college => college.university_id === selectedUniversityId);
    }
    // For 'university', 'college', 'department' roles, currentColleges should already be correctly scoped
    // by the backend (fetchCollegesByUniversity or fetchMyCollege).

    let results = collegesToProcess;
    
    // Then, filter by the debounced search term
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    if (lowerSearchTerm) {
      results = results.filter(college =>
        (college.name && college.name.toLowerCase().includes(lowerSearchTerm)) ||
        (college.code && college.code.toLowerCase().includes(lowerSearchTerm)) || // Added search by code
        (college.description && college.description.toLowerCase().includes(lowerSearchTerm)) ||
        (college.head_name && college.head_name.toLowerCase().includes(lowerSearchTerm)) // Assuming 'dean' is 'head_name'
      );
    }
    return results;
  }, [currentColleges, debouncedSearchTerm, selectedUniversityId, userRole]);


  const pageTitle = useMemo(() => {
    if (userRole === 'admin' || userRole === 'authority') {
      return selectedUniversityForContext ? `${selectedUniversityForContext.name} Colleges` : 'All Colleges';
    }
    // TODO: Adjust for CollegeStaffView or other roles
    return user?.universityName ? `${user.universityName} Colleges` : 'Colleges'; 
  }, [selectedUniversityForContext, userRole, user]);

  const countMessage = useMemo(() => {
    const baseCountText = `${filteredColleges.length} ${filteredColleges.length === 1 ? 'College' : 'Colleges'}`;
    if (userRole === 'admin' || userRole === 'authority') {
      const locationText = selectedUniversityForContext ? `in ${selectedUniversityForContext.name}` : 'Across All Universities';
      // Use debouncedSearchTerm here
      return debouncedSearchTerm.trim()
        ? `${filteredColleges.length} ${filteredColleges.length === 1 ? 'Result' : 'Results'} Found ${locationText}`
        : `${baseCountText} ${locationText}`;
    }
    // Use debouncedSearchTerm here too
    return debouncedSearchTerm.trim()
      ? `${filteredColleges.length} ${filteredColleges.length === 1 ? 'Result' : 'Results'} Found`
      : baseCountText;
  }, [filteredColleges.length, debouncedSearchTerm, selectedUniversityForContext, userRole]);
  
  const searchPlaceholderText = useMemo(() => {
    if (userRole === 'admin' || userRole === 'authority') {
      return selectedUniversityForContext ? `Search in ${selectedUniversityForContext.name}...` : "Search all colleges...";
    }
    // TODO: Adjust for CollegeStaffView or other roles
    return "Search colleges...";
  }, [selectedUniversityForContext, userRole]);


  const handleUniversitySelect = (universityId) => {
    setSelectedUniversityId(universityId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const openPopup = (college) => {
    setSelectedCollege(college);
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = '';
    setSelectedCollege(null);
  };

  const handleUpdateCollege = async (updatedCollegeData) => {
    try {
      const savedCollege = await editCollege(updatedCollegeData);
      setCurrentColleges(prevColleges =>
        prevColleges.map(college =>
          college.id === savedCollege.id ? savedCollege : college
        )
      );
      closePopup();
    } catch (err) {
      console.error("Failed to update college:", err);
      setError(`Failed to update college: ${err.message}`); 
    }
  };

  const handleCollegeAdded = (newCollege) => {
    // Option 1: Add to current list (if API returns the full new object)
    // setCurrentColleges(prev => [...prev, newCollege]);

    // Option 2: More robust - refetch the list to ensure data consistency
    // This requires loadCollegesData to be callable or to re-trigger the useEffect
    // For simplicity, let's make loadCollegesData accessible or re-trigger effect.
    // The easiest way to re-trigger the useEffect that loads colleges:
    const loadCollegesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCollegesByUniversity(); 
        setCurrentColleges(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch colleges.');
        setCurrentColleges([]);
      } finally {
        setLoading(false);
      }
    };
    loadCollegesData(); // Re-fetch colleges
  };

  const isOverallLoading = (userRole === 'admin' || userRole === 'authority') 
    ? universitiesLoading || loading 
    : loading;

  if (isOverallLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-text-muted">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light">
      {userRole === 'admin' || userRole === 'authority' || userRole === 'university' ? (
        <CollegeAdminView
          user={user}
          universitiesList={universitiesList}
          selectedUniversityId={selectedUniversityId}
          handleUniversitySelect={handleUniversitySelect}
          universitiesLoading={universitiesLoading}
          universitiesError={universitiesError}
          pageTitle={pageTitle}
          countMessage={countMessage}
          searchTerm={searchTerm} // Keep passing the original searchTerm for input value
          handleSearchChange={handleSearchChange}
          clearSearch={() => setSearchTerm('')}
          searchPlaceholderText={searchPlaceholderText}
          collegeError={error} 
          collegesLoading={loading} 
          filteredColleges={filteredColleges} // This is now based on debouncedSearchTerm
          universityCodeMap={universityCodeMap}
          openCollegePopup={openPopup}
          onCollegeAdded={handleCollegeAdded}
        />
      ) : (
        // Non-admin/authority view (University users, College users, Others)
        <main className="flex-grow p-6 md:p-8 overflow-y-auto w-full">
          {/* Header and Search bar are part of this main section in College.jsx */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-text-dark mb-1">{pageTitle}</h1>
              <p className="text-text-muted text-sm">{countMessage}</p>
            </div>
            <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={searchPlaceholderText}
                value={searchTerm} // Keep using searchTerm for UI immediacy
                onChange={handleSearchChange}
                className="py-2 pl-10 pr-10 block w-full border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {error && ( // Display error related to fetching colleges
            <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
              <p>Error: {error}</p>
            </div>
          )}

          {/* 
            The 'loading' prop passed to CollegeStaffView is the overall college list loading state.
            College.jsx handles the main "Loading colleges..." message if 'loading' is true before this point.
            If CollegeStaffView is rendered, 'loading' is likely false, or it's for a sub-part.
            The main "No colleges found" is also handled by College.jsx before rendering CollegeStaffView.
          */}
          {!loading && !error && filteredColleges.length === 0 && (
             <div className="flex flex-col items-center justify-center py-16">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-center text-text-muted text-lg">
                    {debouncedSearchTerm ? 'No colleges found matching your search criteria.' : 'No colleges available.'}
                </p>
                {debouncedSearchTerm && <button onClick={() => setSearchTerm('')} className="mt-4 text-primary hover:text-primary-dark font-medium">Clear search</button>}
            </div>
          )}

          {!loading && !error && filteredColleges.length > 0 && (
            <CollegeStaffView
              user={user} // Pass the whole user object from useAuth
              colleges={filteredColleges}
              onUpdateCollege={handleUpdateCollege}
              openCollegePopup={openPopup}
            />
          )}
        </main>
      )}

      {isPopupOpen && selectedCollege && (
        <CollegePopup
          college={selectedCollege}
          onClose={closePopup}
          onUpdate={handleUpdateCollege}
          userRole={user?.role} // Pass userRole here
        />
      )}
    </div>
  );
};

export default College;

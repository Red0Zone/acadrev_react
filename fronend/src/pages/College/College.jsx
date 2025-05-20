import React, { useState, useMemo, useEffect } from 'react';
// TODO: If universities data is dynamic, fetch it instead of importing statically.
// import { universities } from './collegeData'; // Kept for university list/filtering // REMOVED
import { fetchColleges, editCollege, fetchUniversities } from './functions'; // Import API functions

// --- Helper Components ---

// Updated CollegeCard to display University Code
const CollegeCard = ({ college, universityCode, onClick }) => (
  <div
    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 group border border-gray-100"
    onClick={() => onClick(college)}
  >
    <div className="h-2 bg-primary w-full group-hover:bg-primary-dark transition-colors duration-300"></div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-primary-dark font-semibold text-lg group-hover:text-primary transition-colors duration-300 flex-1 mr-2">{college.name}</h3>
        {universityCode && (
          <span className="text-xs font-mono px-2 py-0.5 bg-secondary/10 text-secondary rounded-md whitespace-nowrap">
            {universityCode}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">Established: {college.established}</p>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-muted">{college.departments?.length || 0} Departments</span>
      </div>
    </div>
  </div>
);

// --- CollegePopup Component (remains largely the same, onUpdate will trigger API call) ---
function CollegePopup({ college, onClose, onUpdate }) {
  const [editedCollege, setEditedCollege] = useState({
    name: college.name,
    dean: college.dean || '',
    established: college.established,
    description: college.description,
    // universityId: college.universityId, // Ensure universityId is part of the college object if needed for update
  });
  const [departments, setDepartments] = useState(college.departments || []);
  const [newDepartment, setNewDepartment] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCollege((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDepartment = () => {
    const trimmed = newDepartment.trim();
    if (trimmed && !departments.includes(trimmed)) {
      setDepartments([...departments, trimmed]);
      setNewDepartment('');
    }
  };

  const handleRemoveDepartment = (deptToRemove) => {
    setDepartments(departments.filter(dept => dept !== deptToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDepartment();
    }
  };

  const handleUpdate = async () => {
    const updatedCollegeData = {
      ...college, // original college data (like id, universityId)
      ...editedCollege, // edited fields
      departments: departments,
    };
    if (onUpdate) {
      await onUpdate(updatedCollegeData); // onUpdate now handles the API call
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-100/50 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white py-8 px-10 rounded-xl shadow-2xl max-w-5xl w-full relative max-h-[85vh] overflow-y-auto transform transition-all duration-300 scale-100 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary rounded-t-xl"></div>
        <button
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="mt-3 text-primary mb-6 text-2xl font-bold">{college.name}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              type="text"
              name="name"
              value={editedCollege.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dean</label>
            <input
              type="text"
              name="dean"
              value={editedCollege.dean}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Established</label>
            <input
              type="number"
              name="established"
              value={editedCollege.established}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">About</label>
            <textarea
              name="description"
              value={editedCollege.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 flex items-center gap-1 group hover:bg-primary/20 transition-colors duration-200"
                >
                  <span>{dept}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDepartment(dept)}
                    className="text-primary/70 hover:text-primary ml-1 rounded-full hover:bg-primary/10 h-5 w-5 flex items-center justify-center transition-colors duration-200"
                    aria-label={`Remove ${dept} department`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              {departments.length === 0 && (
                <div className="text-gray-400 text-sm italic">No departments added yet</div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add department..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAddDepartment}
                className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Press Enter or click Add</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Update College
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Main College Component ---
const College = () => {
  // TODO: Replace with actual role from auth context/state
  const [userRole, setUserRole] = useState('admin'); // 'admin', 'authority', or other roles like 'user', 'guest'
  
  const [universitiesList, setUniversitiesList] = useState([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [universitiesError, setUniversitiesError] = useState(null);
  const [selectedUniversityId, setSelectedUniversityId] = useState(null); // Initialize to null

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [currentColleges, setCurrentColleges] = useState([]);
  const [loading, setLoading] = useState(true); // For colleges
  const [error, setError] = useState(null); // For colleges

  // Fetch universities
  useEffect(() => {
    const loadUniversities = async () => {
      if (userRole === 'admin' || userRole === 'authority') {
        try {
          setUniversitiesLoading(true);
          setUniversitiesError(null);
          const data = await fetchUniversities();
          setUniversitiesList(data);
          if (data.length > 0 && !selectedUniversityId) { // Set default selected university if not already set
            // setSelectedUniversityId(data[0].id); // Optionally select the first one by default
          }
        } catch (err) {
          setUniversitiesError(err.message || 'Failed to fetch universities.');
          setUniversitiesList([]);
        } finally {
          setUniversitiesLoading(false);
        }
      } else {
        setUniversitiesList([]);
        setUniversitiesLoading(false);
      }
    };
    loadUniversities();
  }, [userRole]); // Re-fetch if userRole changes

  // Fetch colleges
  useEffect(() => {
    const loadColleges = async () => {
      if (userRole === 'admin' || userRole === 'authority') {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchColleges();
          setCurrentColleges(data);
        } catch (err) {
          setError(err.message || 'Failed to fetch colleges.');
          setCurrentColleges([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentColleges([]);
        setLoading(false);
      }
    };

    loadColleges();
  }, [userRole]);

  const universityCodeMap = useMemo(() => {
    return universitiesList.reduce((map, uni) => {
      map[uni.id] = uni.code;
      return map;
    }, {});
  }, [universitiesList]);

  const filteredColleges = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    let results = [...currentColleges];

    if (selectedUniversityId) {
      results = results.filter(college => college.universityId === selectedUniversityId);
    }

    if (lowerSearchTerm) {
      results = results.filter(college =>
        college.name.toLowerCase().includes(lowerSearchTerm) ||
        (college.description && college.description.toLowerCase().includes(lowerSearchTerm)) ||
        (college.dean && college.dean.toLowerCase().includes(lowerSearchTerm))
      );
    }
    return results;
  }, [selectedUniversityId, searchTerm, currentColleges]);

  const selectedUniversity = useMemo(() => {
    return universitiesList.find(uni => uni.id === selectedUniversityId);
  }, [selectedUniversityId, universitiesList]);

  const handleUniversitySelect = (universityId) => {
    setSelectedUniversityId(universityId); // Can be null for "All Universities"
    closePopup(); // Assuming this is for college popup, not university selection popup
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
      // Optionally, show a success notification
    } catch (err) {
      console.error("Failed to update college:", err);
      setError(`Failed to update college: ${err.message}`); // Show error to user
    }
  };
  
  const pageTitle = selectedUniversity
    ? `${selectedUniversity.name} Colleges`
    : (userRole === 'admin' || userRole === 'authority') ? 'All Colleges' : 'Colleges';

  const countMessage = searchTerm.trim()
    ? `${filteredColleges.length} ${filteredColleges.length === 1 ? 'Result' : 'Results'} Found ${selectedUniversity ? `in ${selectedUniversity.name}` : (userRole === 'admin' || userRole === 'authority') ? 'Across All Universities' : ''}`
    : `${filteredColleges.length} ${filteredColleges.length === 1 ? 'College' : 'Colleges'} ${selectedUniversity ? `in ${selectedUniversity.name}` : (userRole === 'admin' || userRole === 'authority') ? 'Across All Universities' : ''}`;


  if (universitiesLoading || loading) { // Check loading for both
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-text-muted">Loading data...</p>
        {/* You can add a spinner here */}
      </div>
    );
  }
  
  if (!(userRole === 'admin' || userRole === 'authority')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01"></path></svg>
        <h1 className="text-2xl font-semibold text-text-dark mb-2">Access Denied</h1>
        <p className="text-text-muted">You do not have permission to view this page.</p>
        {(error || universitiesError) && <p className="text-red-500 mt-4">Error: {error || universitiesError}</p>}
      </div>
    );
  }
  
  // Admin/Authority view
  return (
    <div className="flex min-h-screen bg-background-light">
      <aside className="flex-none w-64 p-6 bg-background-aside border-r border-gray-100 overflow-y-auto shadow-sm hidden md:block">
        <h2 className="mt-0 mb-6 text-xl font-semibold text-secondary pb-2 border-b border-gray-200">
          Universities
        </h2>
        {universitiesLoading && <p className="text-text-muted">Loading universities...</p>}
        {universitiesError && <p className="text-red-500 text-sm">Error: {universitiesError}</p>}
        {!universitiesLoading && !universitiesError && (
          <ul className="list-none p-0 m-0 space-y-2">
            <li
              className={`py-3 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out text-text-dark ${
                !selectedUniversityId
                  ? 'bg-primary text-white font-medium shadow-md'
                  : 'hover:bg-gray-100 border border-transparent'
              }`}
              onClick={() => handleUniversitySelect(null)} // Pass null for "All Universities"
            >
              All Universities
            </li>
            {universitiesList.map(uni => (
              <li
                key={uni.id}
                className={`py-3 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out text-text-dark ${
                  selectedUniversityId === uni.id
                    ? 'bg-primary text-white font-medium shadow-md'
                    : 'hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => handleUniversitySelect(uni.id)}
              >
                {uni.name}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="flex-grow p-6 md:p-8 overflow-y-auto">
        <div className="block md:hidden mb-6">
          <label htmlFor="university-selector" className="block text-sm font-medium text-text-muted mb-2">
            Select University
          </label>
          <select
            id="university-selector"
            value={selectedUniversityId || ''} // Handle null for "All Universities"
            onChange={(e) => handleUniversitySelect(e.target.value ? e.target.value : null)} // Ensure null if empty string
            className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={universitiesLoading || !!universitiesError}
          >
             <option value="">All Universities</option>
            {universitiesList.map(uni => (
              <option key={uni.id} value={uni.id}>{uni.name}</option>
            ))}
          </select>
          {universitiesLoading && <p className="text-text-muted text-sm mt-1">Loading universities...</p>}
          {universitiesError && <p className="text-red-500 text-sm mt-1">Error: {universitiesError}</p>}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-text-dark mb-1">
              {pageTitle}
            </h1>
            <p className="text-text-muted text-sm">
              {countMessage}
            </p>
          </div>
          <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={selectedUniversity ? `Search in ${selectedUniversity.code}...` : "Search all colleges..."}
              value={searchTerm}
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
        
        {error && ( // This is for college fetching errors
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            <p>Error fetching colleges: {error}</p>
          </div>
        )}

        {loading && !error && <p className="text-text-muted">Loading colleges...</p>}

        {!loading && filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredColleges.map(college => (
              <CollegeCard
                key={college.id}
                college={college}
                universityCode={universityCodeMap[college.universityId]}
                onClick={openPopup}
              />
            ))}
          </div>
        ) : (
          !loading && ( // Only show "no colleges" if not loading
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-center text-text-muted text-lg">
                {searchTerm
                  ? 'No colleges found matching your search criteria.'
                  : selectedUniversityId
                    ? `No colleges found for ${selectedUniversity?.name}.`
                    : 'No colleges available or select a university/search.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-primary hover:text-primary-dark font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          )
        )}
      </main>

      {isPopupOpen && selectedCollege && (
          <CollegePopup
              college={selectedCollege}
              onClose={closePopup}
              onUpdate={handleUpdateCollege}
          />
      )}
    </div>
  );
};

export default College;

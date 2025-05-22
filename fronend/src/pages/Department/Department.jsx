import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  University, 
  School, 
  Building, 
  ChevronRight, 
  Home, 
  Search, 
  Users, 
  MapPin, 
  Calendar, 
  Award,
  Phone,
  Mail,
  Globe,
  ArrowLeft
} from 'lucide-react';

// Mock data for universities, colleges, and departments
const mockUniversities = [
  { id: 1, name: "King Saud University", shortName: "KSU", logo: "ksu-logo.png", location: "Riyadh" },
  { id: 2, name: "King Abdulaziz University", shortName: "KAU", logo: "kau-logo.png", location: "Jeddah" },
  { id: 3, name: "King Fahd University of Petroleum & Minerals", shortName: "KFUPM", logo: "kfupm-logo.png", location: "Dhahran" },
  { id: 4, name: "Princess Nourah bint Abdulrahman University", shortName: "PNU", logo: "pnu-logo.png", location: "Riyadh" },
  { id: 5, name: "Imam Abdulrahman Bin Faisal University", shortName: "IAU", logo: "iau-logo.png", location: "Dammam" },
  { id: 6, name: "Umm Al-Qura University", shortName: "UQU", logo: "uqu-logo.png", location: "Mecca" },
];

const mockColleges = {
  1: [ // KSU Colleges
    { id: 101, name: "College of Computer and Information Sciences", shortName: "CCIS", departments: 4, established: 1982 },
    { id: 102, name: "College of Engineering", shortName: "COE", departments: 7, established: 1962 },
    { id: 103, name: "College of Science", shortName: "COS", departments: 6, established: 1958 },
    { id: 104, name: "College of Business Administration", shortName: "CBA", departments: 5, established: 1959 },
  ],
  2: [ // KAU Colleges
    { id: 201, name: "Faculty of Computing and Information Technology", shortName: "FCIT", departments: 5, established: 1974 },
    { id: 202, name: "Faculty of Engineering", shortName: "FOE", departments: 8, established: 1967 },
    { id: 203, name: "Faculty of Medicine", shortName: "FOM", departments: 12, established: 1975 },
  ],
  3: [ // KFUPM Colleges
    { id: 301, name: "College of Computer Science and Engineering", shortName: "CCSE", departments: 3, established: 1986 },
    { id: 302, name: "College of Engineering Sciences", shortName: "CES", departments: 7, established: 1963 },
    { id: 303, name: "College of Sciences", shortName: "CS", departments: 5, established: 1964 },
  ],
  4: [ // PNU Colleges
    { id: 401, name: "College of Computer and Information Sciences", shortName: "CCIS", departments: 4, established: 2008 },
    { id: 402, name: "College of Design and Art", shortName: "CDA", departments: 6, established: 2006 },
    { id: 403, name: "College of Medicine", shortName: "COM", departments: 9, established: 2012 },
  ],
  5: [ // IAU Colleges
    { id: 501, name: "College of Computer Science and Information Technology", shortName: "CCSIT", departments: 3, established: 2009 },
    { id: 502, name: "College of Medicine", shortName: "COM", departments: 10, established: 1975 },
    { id: 503, name: "College of Engineering", shortName: "COE", departments: 6, established: 1980 },
  ],
  6: [ // UQU Colleges
    { id: 601, name: "College of Computer and Information Systems", shortName: "CCIS", departments: 4, established: 2006 },
    { id: 602, name: "College of Engineering", shortName: "COE", departments: 5, established: 1988 },
    { id: 603, name: "College of Medicine", shortName: "COM", departments: 8, established: 1995 },
  ],
};

const mockDepartments = {
  101: [ // KSU CCIS
    { id: 1001, name: "Computer Science", shortName: "CS", programs: 3, faculty: 45, established: 1982 },
    { id: 1002, name: "Information Technology", shortName: "IT", programs: 2, faculty: 38, established: 1998 },
    { id: 1003, name: "Software Engineering", shortName: "SWE", programs: 1, faculty: 27, established: 2003 },
    { id: 1004, name: "Information Systems", shortName: "IS", programs: 2, faculty: 32, established: 1994 },
  ],
  102: [ // KSU COE 
    { id: 1005, name: "Electrical Engineering", shortName: "EE", programs: 3, faculty: 58, established: 1962 },
    { id: 1006, name: "Mechanical Engineering", shortName: "ME", programs: 2, faculty: 47, established: 1962 },
    { id: 1007, name: "Civil Engineering", shortName: "CE", programs: 2, faculty: 42, established: 1963 },
    { id: 1008, name: "Chemical Engineering", shortName: "CHE", programs: 1, faculty: 35, established: 1965 },
  ],
  201: [ // KAU FCIT
    { id: 2001, name: "Computer Science", shortName: "CS", programs: 3, faculty: 40, established: 1974 },
    { id: 2002, name: "Information Technology", shortName: "IT", programs: 2, faculty: 35, established: 1999 },
    { id: 2003, name: "Information Systems", shortName: "IS", programs: 2, faculty: 30, established: 1992 },
    { id: 2004, name: "Artificial Intelligence", shortName: "AI", programs: 1, faculty: 20, established: 2018 },
  ],
  301: [ // KFUPM CCSE
    { id: 3001, name: "Computer Engineering", shortName: "COE", programs: 2, faculty: 37, established: 1986 },
    { id: 3002, name: "Computer Science", shortName: "ICS", programs: 3, faculty: 42, established: 1987 },
    { id: 3003, name: "Software Engineering", shortName: "SWE", programs: 1, faculty: 28, established: 2008 },
  ],
  // Add more department mappings for other colleges as needed
};

// Main component for the Department page
const DepartmentPage = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('universities'); // 'universities', 'colleges', 'departments'
  
  const navigate = useNavigate();
  const { universityId, collegeId } = useParams(); // If using React Router with dynamic routes

  // Initialize based on URL parameters if available
  useEffect(() => {
    if (universityId) {
      const university = mockUniversities.find(uni => uni.id === parseInt(universityId));
      if (university) {
        setSelectedUniversity(university);
        setView('colleges');
        
        if (collegeId) {
          const college = mockColleges[university.id]?.find(col => col.id === parseInt(collegeId));
          if (college) {
            setSelectedCollege(college);
            setView('departments');
          }
        }
      }
    }
  }, [universityId, collegeId]);

  // Filter universities based on search
  const filteredUniversities = mockUniversities.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    uni.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get colleges for the selected university
  const collegesForUniversity = selectedUniversity ? mockColleges[selectedUniversity.id] || [] : [];
  
  // Filter colleges based on search
  const filteredColleges = collegesForUniversity.filter(college => 
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    college.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get departments for the selected college
  const departmentsForCollege = selectedCollege ? mockDepartments[selectedCollege.id] || [] : [];
  
  // Filter departments based on search
  const filteredDepartments = departmentsForCollege.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dept.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle university selection
  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setSelectedCollege(null);
    setView('colleges');
    navigate(`/department/${university.id}`); // Update URL without reloading
  };

  // Handle college selection
  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setView('departments');
    navigate(`/department/${selectedUniversity.id}/${college.id}`); // Update URL without reloading
  };

  // Handle navigation via breadcrumbs
  const handleBreadcrumbClick = (view, uniId = null, colId = null) => {
    if (view === 'universities') {
      setSelectedUniversity(null);
      setSelectedCollege(null);
      setView('universities');
      navigate('/department');
    } else if (view === 'colleges') {
      setSelectedCollege(null);
      setView('colleges');
      navigate(`/department/${uniId}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar/Nav */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <University className="mr-2" size={20} />
            Universities
          </h2>
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {filteredUniversities.map((uni) => (
            <button
              key={uni.id}
              onClick={() => handleUniversitySelect(uni)}
              className={`w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 transition-colors
                ${selectedUniversity?.id === uni.id ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-500' : 'text-gray-700'}`}
            >
              <div className="mr-3 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                <span className="text-sm font-semibold">{uni.shortName}</span>
              </div>
              <div>
                <div className="font-medium text-sm">{uni.name}</div>
                <div className="text-xs text-gray-500 flex items-center mt-0.5">
                  <MapPin size={12} className="mr-1" /> {uni.location}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center mb-6 text-sm">
            <button 
              onClick={() => handleBreadcrumbClick('universities')} 
              className="text-gray-500 hover:text-indigo-600 flex items-center"
            >
              <Home size={16} className="mr-1" /> Home
            </button>
            
            {selectedUniversity && (
              <>
                <ChevronRight size={16} className="mx-2 text-gray-400" />
                <button 
                  onClick={() => handleBreadcrumbClick('colleges', selectedUniversity.id)} 
                  className={`flex items-center ${selectedCollege ? 'text-gray-500 hover:text-indigo-600' : 'text-gray-900 font-medium'}`}
                >
                  <University size={16} className="mr-1" /> 
                  {selectedUniversity.name}
                </button>
              </>
            )}
            
            {selectedCollege && (
              <>
                <ChevronRight size={16} className="mx-2 text-gray-400" />
                <span className="text-gray-900 font-medium flex items-center">
                  <School size={16} className="mr-1" /> 
                  {selectedCollege.name}
                </span>
              </>
            )}
          </nav>

          {/* Title and Description */}
          {view === 'universities' && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Universities</h1>
              <p className="text-gray-600">Select a university to view its colleges.</p>
            </div>
          )}

          {view === 'colleges' && selectedUniversity && (
            <div className="mb-8">
              <div className="flex items-start">
                <button 
                  onClick={() => handleBreadcrumbClick('universities')}
                  className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedUniversity.name}</h1>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span>{selectedUniversity.location}</span>
                    <span className="mx-2">•</span>
                    <School size={16} className="mr-1" />
                    <span>{collegesForUniversity.length} Colleges</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'departments' && selectedCollege && (
            <div className="mb-8">
              <div className="flex items-start">
                <button 
                  onClick={() => handleBreadcrumbClick('colleges', selectedUniversity.id)}
                  className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCollege.name}</h1>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar size={16} className="mr-1" />
                    <span>Est. {selectedCollege.established}</span>
                    <span className="mx-2">•</span>
                    <Building size={16} className="mr-1" />
                    <span>{departmentsForCollege.length} Departments</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Cards */}
          {view === 'universities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map(uni => (
                <div 
                  key={uni.id}
                  onClick={() => handleUniversitySelect(uni)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 overflow-hidden"
                >
                  <div className="h-24 bg-indigo-700 flex items-center justify-center relative">
                    <span className="text-white font-bold text-3xl">{uni.shortName}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">{uni.name}</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      <span>{uni.location}</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <School size={14} className="mr-1" />
                        <span>{mockColleges[uni.id]?.length || 0} Colleges</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Colleges
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'colleges' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map(college => (
                <div 
                  key={college.id}
                  onClick={() => handleCollegeSelect(college)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 overflow-hidden"
                >
                  <div className={`h-16 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center px-5`}>
                    <h3 className="font-semibold text-lg text-white flex items-center">
                      <School size={18} className="mr-2" />
                      {college.shortName}
                    </h3>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{college.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs flex items-center">
                        <Building size={12} className="mr-1" />
                        {college.departments} Departments
                      </div>
                      <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs flex items-center">
                        <Calendar size={12} className="mr-1" />
                        Est. {college.established}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                      <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        View Departments
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'departments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map(dept => (
                <div 
                  key={dept.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                >
                  <div className="h-16 bg-gradient-to-r from-green-600 to-green-800 flex items-center px-5">
                    <h3 className="font-semibold text-lg text-white flex items-center">
                      <Building size={18} className="mr-2" />
                      {dept.shortName}
                    </h3>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs flex items-center">
                        <Award size={12} className="mr-1" />
                        {dept.programs} Programs
                      </div>
                      <div className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md text-xs flex items-center">
                        <Users size={12} className="mr-1" />
                        {dept.faculty} Faculty
                      </div>
                      <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs flex items-center col-span-2">
                        <Calendar size={12} className="mr-1" />
                        Est. {dept.established}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Contact Department
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 rounded-full hover:bg-gray-100">
                          <Phone size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-gray-100">
                          <Mail size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-gray-100">
                          <Globe size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty States */}
          {view === 'universities' && filteredUniversities.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <University size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Universities Found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
            </div>
          )}
          
          {view === 'colleges' && filteredColleges.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <School size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Colleges Found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
            </div>
          )}
          
          {view === 'departments' && filteredDepartments.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Building size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Departments Found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
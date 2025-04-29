// data.js
// Note: Information based on publicly available data. Current dean names are often difficult
// to ascertain definitively and may change. Data, especially for institutions in Gaza,
// may be impacted by ongoing events. Establishment dates typically refer to the founding
// year or year university status was granted.

export const universities = [
  { id: 'uni1', name: 'Birzeit University (BZU)', code:'BZU' }, // Ramallah
  { id: 'uni2', name: 'An-Najah National University (ANU)' , code:'ANU' }, // Nablus
  { id: 'uni3', name: 'Al-Quds University (AQU)' , code:'AQU' }, // Jerusalem
  { id: 'uni4', name: 'Islamic University of Gaza (IUG)' , code:'IUG' }, // Gaza (Information may be significantly impacted by current events)
  { id: 'uni5', name: 'Hebron University (HU)' , code:'HU' }, // Hebron
  { id: 'uni6', name: 'Palestine Polytechnic University (PPU)', code:'PPU' }, // Hebron
  { id: 'uni7', name: 'Arab American University Palestine (AAUP)' , code:'AAUP' }, // Jenin & Ramallah
  { id: 'uni8', name: 'Bethlehem University (BU)', code:'BU' }, // Bethlehem
  { id: 'uni9', name: 'Al-Azhar University - Gaza (AU)', code:'AU' }, // Gaza (Information may be significantly impacted by current events)

];

export const colleges = [
  // Birzeit University Colleges/Faculties (uni1)
  {
    id: 'col1',
    universityId: 'uni1',
    name: 'Faculty of Engineering and Technology',
    dean: 'Dean Information Unavailable', // Example placeholder
    established: 1979, // Approx. Faculty start
    description: 'Leading faculty providing comprehensive programs in various engineering disciplines and information technology.',
    departments: ['Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Computer Science', 'Computer Engineering', 'Architectural Engineering'],
  },
  {
    id: 'col2',
    universityId: 'uni1',
    name: 'Faculty of Business and Economics',
    dean: 'Dean Information Unavailable',
    established: 1978, // Approx. Faculty start
    description: 'Offers diverse programs in business administration, economics, accounting, and finance to prepare leaders for the Palestinian economy.',
    departments: ['Business Administration', 'Economics', 'Accounting', 'Finance', 'Marketing'],
  },
   {
    id: 'col3',
    universityId: 'uni1',
    name: 'Faculty of Arts',
    dean: 'Dean Information Unavailable',
    established: 1975, // Coincides with University establishment
    description: 'Focuses on humanities and social sciences, fostering critical thinking and cultural understanding.',
    departments: ['Arabic Language and Literature', 'English Language and Literature', 'History', 'Geography', 'Sociology and Anthropology', 'Philosophy and Cultural Studies'],
  },

  // An-Najah National University Colleges/Faculties (uni2)
  {
    id: 'col4',
    universityId: 'uni2',
    name: 'Faculty of Medicine and Health Sciences',
    dean: 'Dean Information Unavailable',
    established: 1999, // Approx. Faculty start
    description: 'A major center for medical education and health research in Palestine, encompassing various health specializations.',
    departments: ['Medicine', 'Pharmacy', 'Nursing', 'Medical Laboratory Sciences', 'Physiotherapy', 'Occupational Therapy'],
  },
  {
    id: 'col5',
    universityId: 'uni2',
    name: 'Faculty of Engineering and Information Technology',
    dean: 'Dean Information Unavailable',
    established: 1979, // Approx. Faculty start
    description: 'Offers a wide range of programs in engineering fields and computing, driving technological advancement.',
    departments: ['Civil Engineering', 'Electrical Engineering', 'Computer Engineering', 'Telecommunications Engineering', 'Chemical Engineering', 'Building Engineering', 'Industrial Engineering', 'Computer Science', 'Management Information Systems'],
  },
   {
    id: 'col6',
    universityId: 'uni2',
    name: 'Faculty of Economics and Social Sciences',
    dean: 'Dean Information Unavailable',
    established: 1977, // Coincides with University establishment
    description: 'Provides education in economics, business, political science, and social work.',
    departments: ['Economics', 'Business Administration', 'Accounting', 'Banking and Financial Sciences', 'Political Science', 'Social Work', 'Geography'],
  },

  // Al-Quds University Colleges/Faculties (uni3)
  {
    id: 'col7',
    universityId: 'uni3',
    name: 'Faculty of Medicine',
    dean: 'Dean Information Unavailable',
    established: 1994,
    description: 'The first Palestinian medical school, dedicated to high standards of medical education and research.',
    departments: ['Basic Medical Sciences', 'Clinical Medical Sciences'],
  },
  {
    id: 'col8',
    universityId: 'uni3',
    name: 'Faculty of Science and Technology',
    dean: 'Dean Information Unavailable',
    established: 1984, // Coincides with University establishment
    description: 'Offers programs in pure and applied sciences, contributing to scientific development.',
    departments: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Environmental Sciences'],
  },
  {
    id: 'col9',
    universityId: 'uni3',
    name: 'Faculty of Law',
    dean: 'Dean Information Unavailable',
    established: 1992,
    description: 'Focuses on legal education, research, and community service within the Palestinian context.',
    departments: ['Public Law', 'Private Law'],
  },

  // Islamic University of Gaza (IUG) Colleges/Faculties (uni4) - Pre-conflict structure
   {
    id: 'col10',
    universityId: 'uni4',
    name: 'Faculty of Engineering',
    dean: 'Dean Information Unavailable',
    established: 1993,
    description: 'Provided key engineering programs in Gaza.',
    departments: ['Civil Engineering', 'Electrical Engineering', 'Computer Engineering', 'Environmental Engineering', 'Architectural Engineering'],
  },
  {
    id: 'col11',
    universityId: 'uni4',
    name: 'Faculty of Science',
    dean: 'Dean Information Unavailable',
    established: 1978, // Coincides with University establishment
    description: 'Focused on fundamental sciences.',
    departments: ['Mathematics', 'Physics', 'Chemistry', 'Biology & Biotechnology', 'Earth Sciences & Environment'],
  },
  {
    id: 'col12',
    universityId: 'uni4',
    name: 'Faculty of Information Technology',
    dean: 'Dean Information Unavailable',
    established: 2003,
    description: 'Specialized in computing and IT fields.',
    departments: ['Computer Science', 'Information Systems', 'Software Development', 'Multimedia Technology'],
  },

  // Hebron University Colleges/Faculties (uni5)
  {
    id: 'col13',
    universityId: 'uni5',
    name: 'Faculty of Science and Technology',
    dean: 'Dean Information Unavailable',
    established: 1984, // Approx. Faculty start
    description: 'Offers programs in natural sciences, mathematics, and computer technology.',
    departments: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
  },
   {
    id: 'col14',
    universityId: 'uni5',
    name: 'Faculty of Finance and Management',
    dean: 'Dean Information Unavailable',
    established: 1987, // Approx. Faculty start
    description: 'Focuses on business, accounting, and financial management education.',
    departments: ['Accounting', 'Business Administration', 'Finance and Banking', 'Management Information Systems'],
  },

  // Palestine Polytechnic University (PPU) Colleges (uni6)
  {
    id: 'col15',
    universityId: 'uni6',
    name: 'College of Engineering',
    dean: 'Dean Information Unavailable',
    established: 1978, // Coincides with University establishment
    description: 'Core college focusing on applied engineering disciplines and technical skills.',
    departments: ['Civil & Architectural Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Computer Systems Engineering', 'Mechatronics Engineering'],
  },
  {
    id: 'col16',
    universityId: 'uni6',
    name: 'College of Applied Sciences',
    dean: 'Dean Information Unavailable',
    established: 1990, // Approx. College start
    description: 'Offers programs connecting scientific principles with practical applications.',
    departments: ['Applied Mathematics', 'Applied Physics', 'Applied Chemistry', 'Applied Biology', 'Environmental Technology'],
  },

  // Arab American University Palestine (AAUP) Colleges/Faculties (uni7)
   {
    id: 'col17',
    universityId: 'uni7',
    name: 'Faculty of Engineering and Information Technology',
    dean: 'Dean Information Unavailable',
    established: 2000, // Coincides with University establishment
    description: 'Modern programs in engineering and IT fields with an international perspective.',
    departments: ['Computer Systems Engineering', 'Electrical Engineering & Renewable Energy', 'Multimedia Technology', 'Computer Science', 'Network Engineering & Security'],
  },
   {
    id: 'col18',
    universityId: 'uni7',
    name: 'Faculty of Dentistry',
    dean: 'Dean Information Unavailable',
    established: 2018,
    description: 'Provides comprehensive training for dental practitioners.',
    departments: ['Basic Dental Sciences', 'Clinical Dental Sciences'],
  },

  // Bethlehem University Colleges/Faculties (uni8)
  {
    id: 'col19',
    universityId: 'uni8',
    name: 'Faculty of Nursing and Health Sciences',
    dean: 'Dean Information Unavailable',
    established: 1976,
    description: 'Dedicated to educating healthcare professionals with a focus on community needs.',
    departments: ['Nursing', 'Midwifery', 'Physiotherapy', 'Occupational Therapy'],
  },
   {
    id: 'col20',
    universityId: 'uni8',
    name: 'Shucri Ibrahim Dabdoub Faculty of Business Administration',
    dean: 'Dean Information Unavailable',
    established: 1979,
    description: 'Offers programs in business management, accounting, and related fields.',
    departments: ['Accounting', 'Business Administration', 'Marketing'],
  },

   // Al-Azhar University - Gaza Colleges/Faculties (uni9) - Pre-conflict structure
   {
    id: 'col21',
    universityId: 'uni9',
    name: 'Faculty of Medicine',
    dean: 'Dean Information Unavailable',
    established: 1999,
    description: 'Contributed significantly to medical education in the Gaza Strip.',
    departments: ['Basic Medical Sciences', 'Clinical Sciences'],
   },
   {
    id: 'col22',
    universityId: 'uni9',
    name: 'Faculty of Pharmacy',
    dean: 'Dean Information Unavailable',
    established: 1992,
    description: 'Focused on pharmaceutical sciences and practice.',
    departments: ['Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry'],
   },
   {
    id: 'col23',
    universityId: 'uni9',
    name: 'Faculty of Engineering and Information Technology',
    dean: 'Dean Information Unavailable',
    established: 2001,
    description: 'Provided education in various engineering disciplines and IT.',
    departments: ['Civil Engineering', 'Computer Engineering', 'Mechatronics Engineering', 'Information Technology'],
   },
];
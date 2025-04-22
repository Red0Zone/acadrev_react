"use client"; // If using Next.js App Router

import React, { useState } from 'react';
// Import the User icon from lucide-react
import { Trash2, X, Mail, University, School, Building, BookOpen, UserCheck, Shield, CheckSquare, Users, User } from 'lucide-react';

// --- Placeholder User Data ---
// Removed avatar property
const initialUsers = [
  {
    id: 1, // Numeric ID < 100
    username: 'admin.ops',
    email: 'admin.ops@example.com',
    uni: 'Central Tech University',
    college: 'N/A',
    department: 'N/A',
    program: 'N/A',
    userLevel: 'Admin', // New Levels: Admin, Uni, QA, College, Dep
  },
  {
    id: 2,
    username: 'uni.registrar',
    email: 'registrar@centraltech.edu',
    uni: 'Central Tech University',
    college: 'N/A',
    department: 'Registrar Office',
    program: 'N/A',
    userLevel: 'Uni',
  },
  {
    id: 3,
    username: 'qa.lead',
    email: 'quality@centraltech.edu',
    uni: 'Central Tech University',
    college: 'N/A',
    department: 'Quality Assurance',
    program: 'N/A',
    userLevel: 'QA',
  },
   {
    id: 4,
    username: 'eng.dean',
    email: 'dean.eng@centraltech.edu',
    uni: 'Central Tech University',
    college: 'College of Engineering',
    department: 'N/A',
    program: 'N/A',
    userLevel: 'College',
  },
   {
    id: 5,
    username: 'cs.head',
    email: 'cs.head@centraltech.edu',
    uni: 'Central Tech University',
    college: 'College of Engineering',
    department: 'Computer Science',
    program: 'N/A',
    userLevel: 'Dep', // Department Level
  },
   {
    id: 6,
    username: 'Dr.Ameer',
    email: 'srep@qa.centraltech.edu',
    uni: 'Central Tech University',
    college: 'College of Engineering',
    department: 'Computer Science',
    program: 'B.Sc. Software Engineering',
    userLevel: 'QA', // Keep Student for example diversity
  },
];

// --- Helper Function for Level Styling ---
const getLevelStyle = (level) => {
  const styles = {
    Admin:   { icon: Shield,      classes: 'bg-red-100 text-red-700 border-red-300' },
    Uni:     { icon: University,  classes: 'bg-purple-100 text-purple-700 border-purple-300' },
    QA:      { icon: CheckSquare, classes: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    College: { icon: School,      classes: 'bg-blue-100 text-blue-700 border-blue-300' },
    Dep:     { icon: Building,    classes: 'bg-teal-100 text-teal-700 border-teal-300' },
    Student: { icon: UserCheck,   classes: 'bg-green-100 text-green-700 border-green-300' },
    Default: { icon: Users,       classes: 'bg-gray-100 text-gray-700 border-gray-300' },
  };
  return styles[level] || styles.Default;
};


// --- User Card Component (Enhanced) ---
function UserCard({ user, onClick }) {
  const levelStyle = getLevelStyle(user.userLevel);
  const LevelIcon = levelStyle.icon;

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer border border-gray-200 flex flex-col p-5 group"
      onClick={() => onClick(user)}
    >
      {/* Header Section */}
      <div className="flex items-center mb-4">
        {/* Replaced img with User icon */}
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-gray-300 group-hover:border-indigo-500 transition-colors flex-shrink-0">
          <User size={32} className="text-indigo-500" />
        </div>
        <div className="ml-4 overflow-hidden">
          <h3 className="text-lg font-bold text-gray-900 truncate" title={user.username}>
            {user.username}
          </h3>
          <p className="text-sm text-gray-500">ID: {String(user.id).padStart(3, '0')}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-2 text-sm mb-4 flex-grow">
        <div className="flex items-center text-gray-600" title={user.email}>
          <Mail size={14} className="mr-2 flex-shrink-0 text-gray-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center text-gray-600" title={user.uni}>
          <University size={14} className="mr-2 flex-shrink-0 text-gray-400" />
           <span className="truncate">{user.uni}</span>
        </div>
      </div>

      {/* Footer Section - Level */}
      <div className="mt-auto pt-3 border-t border-gray-100">
         <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${levelStyle.classes}`}>
            <LevelIcon size={14} />
            {user.userLevel}
         </span>
      </div>
    </div>
  );
}

// --- User Detail Modal Component (Minor Adjustments) ---
function UserDetailModal({ user, isOpen, onClose, onDelete }) {
  if (!isOpen || !user) return null;

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete user ${user.username} (ID: ${user.id})? This action cannot be undone.`)) {
      onDelete(user.id, user.username);
    }
  };

  const detailItem = (IconComponent, label, value) => (
    <div className="flex items-start space-x-3 py-2.5 border-b border-gray-100 last:border-b-0">
      <IconComponent className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value || 'N/A'}</p>
      </div>
    </div>
  );

  const levelStyle = getLevelStyle(user.userLevel);
  const LevelIcon = levelStyle.icon;

  return (
    <div className="fixed inset-0 bg-gray-100/80 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center p-5 border-b border-gray-200">
           {/* Replaced img with User icon */}
           <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border flex-shrink-0 mr-4">
             <User size={32} className="text-indigo-500" />
           </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
            <p className="text-sm text-gray-500">ID: {String(user.id).padStart(3, '0')}</p>
          </div>
        </div>

        {/* Modal Body - User Details */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {detailItem(Mail, "Email", user.email)}
          {detailItem(LevelIcon, "User Level", user.userLevel)}
          {detailItem(University, "University", user.uni)}
          {detailItem(School, "College", user.college)}
          {detailItem(Building, "Department", user.department)}
          {detailItem(BookOpen, "Program", user.program)}
        </div>

        {/* Modal Footer - Actions */}
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg space-x-3">
           <button
            onClick={handleDeleteClick}
            className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 size={16} />
            Delete User
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


// --- Main Users Page Component ---
function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  const handleDeleteUser = (userId, username) => {
    console.log(`Attempting to delete user: ${username} (ID: ${userId})`);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    handleCloseModal();
    alert(`User ${username} deleted successfully.`);
    // Add actual API call for deletion here
  };

  return (
    <div className="container mx-auto p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Management</h1>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {users.map(user => (
            <UserCard key={user.id} user={user} onClick={handleCardClick} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 text-gray-500 bg-white rounded-lg shadow">
            <Users size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No users found.</p>
            <p className="text-sm">Consider adding new users to the system.</p>
         </div>
      )}

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteUser}
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeIn 0.3s ease-out, fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default UsersPage;

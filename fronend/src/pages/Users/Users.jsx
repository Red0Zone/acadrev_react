"use client"; 

import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, X, Mail, University, School, Building, UserCheck, Shield, CheckSquare, Users as UsersIcon, User, Edit3, PlusCircle, Briefcase, Key, Eye, EyeOff } from 'lucide-react';
import { fetchUsers, addUser, updateUser, deleteUserApi } from './function'; // Adjust the import based on your project structure

// --- API Service Functions ---
// Ideally, these would be in a separate userService.js file


// --- Helper Function for Role Styling ---
const getRoleStyle = (role) => {
  const styles = {
    admin:     { icon: Shield,      classes: 'bg-red-100 text-red-700 border-red-300' },
    authority: { icon: Briefcase,   classes: 'bg-orange-100 text-orange-700 border-orange-300' },
    university:{ icon: University,  classes: 'bg-purple-100 text-purple-700 border-purple-300' },
    college:   { icon: School,      classes: 'bg-blue-100 text-blue-700 border-blue-300' },
    department:{ icon: Building,    classes: 'bg-teal-100 text-teal-700 border-teal-300' },
    default:   { icon: UserCheck,   classes: 'bg-gray-100 text-gray-700 border-gray-300' },
  };
  return styles[role] || styles.default;
};

const ALL_ROLES = ['admin', 'authority', 'university', 'college', 'department'];

// --- User Card Component ---
function UserCard({ user, onView, onEdit, onDelete }) {
  const roleStyle = getRoleStyle(user.role);
  const RoleIcon = roleStyle.icon;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden border border-gray-200 flex flex-col group">
      <div className="p-5">
        <div className="flex items-center mb-4">
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
        <div className="space-y-2 text-sm mb-4 flex-grow">
          <div className="flex items-center text-gray-600" title={user.email}>
            <Mail size={14} className="mr-2 flex-shrink-0 text-gray-400" />
            <span className="truncate">{user.email}</span>
          </div>
          {user.university_id && (
            <div className="flex items-center text-gray-600">
              <University size={14} className="mr-2 flex-shrink-0 text-gray-400" />
              <span className="truncate">Uni ID: {user.university_id}</span>
            </div>
          )}
          {/* Add similar displays for authority_id, college_id, department_id if needed */}
        </div>
        <div className="pt-3 border-t border-gray-100">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${roleStyle.classes}`}>
            <RoleIcon size={14} />
            {user.role}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 p-2 flex justify-end space-x-2 border-t">
        <button onClick={() => onView(user)} className="p-1.5 text-gray-500 hover:text-indigo-600"><Eye size={18}/></button>
        <button onClick={() => onEdit(user)} className="p-1.5 text-gray-500 hover:text-blue-600"><Edit3 size={18}/></button>
        <button onClick={() => onDelete(user.id, user.username)} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={18}/></button>
      </div>
    </div>
  );
}

// --- User Detail Modal ---
function UserDetailModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  const roleStyle = getRoleStyle(user.role);
  const RoleIcon = roleStyle.icon;

  const detailItem = (IconComponent, label, value, isId = false) => (
    <div className="flex items-start space-x-3 py-2.5 border-b border-gray-100 last:border-b-0">
      <IconComponent className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value === null || value === undefined || value === '' ? <span className="italic text-gray-400">N/A</span> : value}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-100/80 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close modal">
          <X size={24} />
        </button>
        <div className="flex items-center p-5 border-b border-gray-200">
           <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border flex-shrink-0 mr-4">
             <User size={32} className="text-indigo-500" />
           </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
            <p className="text-sm text-gray-500">ID: {String(user.id).padStart(3, '0')}</p>
          </div>
        </div>
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {detailItem(Mail, "Email", user.email)}
          {detailItem(RoleIcon, "Role", user.role)}
          {detailItem(Key, "Authority ID", user.authority_id, true)}
          {detailItem(University, "University ID", user.university_id, true)}
          {detailItem(School, "College ID", user.college_id, true)}
          {detailItem(Building, "Department ID", user.department_id, true)}
          {detailItem(CheckSquare, "Active", user.is_active ? "Yes" : "No")}
          {detailItem(UsersIcon, "Created At", new Date(user.created_at).toLocaleString())}
        </div>
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium rounded-md shadow-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Add/Edit User Modal ---
function AddEditUserModal({ isOpen, onClose, onSave, userToEdit, loggedInUserRole }) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const isEditMode = !!userToEdit;

  useEffect(() => {
    if (isOpen) {
      setFormError(''); // Clear previous errors
      if (isEditMode) {
        setFormData({
          username: userToEdit.username || '',
          email: userToEdit.email || '',
          password: '', // Password field empty for edit, only set if changed
          role: userToEdit.role || '',
          authority_id: userToEdit.authority_id || '',
          university_id: userToEdit.university_id || '',
          college_id: userToEdit.college_id || '',
          department_id: userToEdit.department_id || '',
          is_active: userToEdit.is_active === 1 || userToEdit.is_active === true,
        });
      } else {
        // Default for new user
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'authority', // Default role, considering admin's typical creation power
          authority_id: '',
          university_id: '',
          college_id: '',
          department_id: '',
          is_active: true,
        });
      }
    }
  }, [isOpen, userToEdit, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const dataToSend = { ...formData };

    // Convert IDs to numbers or null if empty
    ['authority_id', 'university_id', 'college_id', 'department_id'].forEach(key => {
        dataToSend[key] = dataToSend[key] ? parseInt(dataToSend[key], 10) : null;
    });
    dataToSend.is_active = dataToSend.is_active ? 1 : 0;


    if (isEditMode && !dataToSend.password) { // Don't send empty password on edit unless it's meant to be cleared
      delete dataToSend.password;
    }
    if (!isEditMode && !dataToSend.password) {
        setFormError("Password is required for new users.");
        return;
    }
    
    // Backend Limitation Note:
    // Your backend currently restricts an 'admin' to only creating/updating users to the 'authority' role.
    // If `loggedInUserRole` is 'admin' and `dataToSend.role` is not 'authority', the backend will likely reject.
    // You may need to adjust backend logic in `userController.js` if admins should manage all roles.
    if (loggedInUserRole === 'admin' && dataToSend.role !== 'authority') {
        console.warn(`Backend Warning: Admin is attempting to set role to '${dataToSend.role}', but backend might restrict to 'authority'.`);
    }

    try {
      await onSave(dataToSend, userToEdit?.id);
      onClose();
    } catch (error) {
      console.error("Save user error:", error);
      setFormError(error.message || "Failed to save user.");
    }
  };
  
  if (!isOpen) return null;

  const selectedRole = formData.role;

  return (
    <div className="fixed inset-0 bg-gray-600/75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        <h2 className="text-xl font-semibold p-6 border-b">{isEditMode ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {formError && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{formError}</p>}
          <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <div className="relative">
            <InputField label={isEditMode ? "New Password (optional)" : "Password"} name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required={!isEditMode} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500">
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
              {ALL_ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
            </select>
          </div>

          {/* Conditional ID fields based on role */}
          {selectedRole === 'university' && <InputField label="Authority ID" name="authority_id" type="number" value={formData.authority_id} onChange={handleChange} placeholder="Required for University role" />}
          {selectedRole === 'college' && <InputField label="University ID" name="university_id" type="number" value={formData.university_id} onChange={handleChange} placeholder="Required for College role" />}
          {selectedRole === 'department' && <InputField label="College ID" name="college_id" type="number" value={formData.college_id} onChange={handleChange} placeholder="Required for Department role" />}
          
          {/* For 'authority' and 'admin' roles, no parent ID is typically needed from this list */}

          <div className="flex items-center">
            <input id="is_active" name="is_active" type="checkbox" checked={formData.is_active} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Is Active</label>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{isEditMode ? 'Save Changes' : 'Create User'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, required = false, placeholder = '' }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
  );
}

// --- Main Users Page Component ---
function UsersPage() {
  // ---- AUTHENTICATION PLACEHOLDER ----
  // Replace this with your actual authentication context/hook
  const [loggedInUser, setLoggedInUser] = useState({ role: 'admin', id: 1 }); // Example admin user
  const [authLoading, setAuthLoading] = useState(false);
  // ---- END AUTHENTICATION PLACEHOLDER ----

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedUserForView, setSelectedUserForView] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [userToEdit, setUserToEdit] = useState(null); // null for add mode, user object for edit mode
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);

  const loadUsers = useCallback(async () => {
    if (loggedInUser?.role !== 'admin') return; // Gate for admin
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      setUsers([]); // Clear users on error
    } finally {
      setIsLoading(false);
    }
  }, [loggedInUser?.role]);

  useEffect(() => {
    if (loggedInUser?.role === 'admin') {
      loadUsers();
    }
  }, [loadUsers, loggedInUser?.role]);

  const handleViewUser = (user) => {
    setSelectedUserForView(user);
    setIsViewModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setUserToEdit(null); // Clear any existing edit state
    setIsAddEditModalOpen(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsAddEditModalOpen(true);
  };

  const handleSaveUser = async (userData, userId) => {
    // The onSave prop in AddEditUserModal will call this
    if (userId) { // Edit mode
      await updateUser(userId, userData);
    } else { // Add mode
      await addUser(userData);
    }
    loadUsers(); // Refresh list
    // Error handling is done within AddEditUserModal, or could be bubbled up
  };

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user ${username} (ID: ${userId})? This action cannot be undone.`)) {
      try {
        await deleteUserApi(userId);
        alert(`User ${username} deleted successfully.`);
        loadUsers(); // Refresh list
      } catch (err) {
        console.error("Delete user error:", err);
        alert(`Failed to delete user: ${err.message}`);
      }
    }
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading authentication...</p></div>;
  }

  if (loggedInUser?.role !== 'admin') {
    return (
      <div className="container mx-auto p-6 lg:p-8 text-center">
        <Shield size={48} className="mx-auto mb-4 text-red-500" />
        <h1 className="text-2xl font-bold text-red-700">Access Denied</h1>
        <p className="text-gray-600 mt-2">This page is for administrators only.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition duration-150"
        >
          <PlusCircle size={20} />
          Add User
        </button>
      </div>

      {isLoading && <p className="text-center text-gray-600">Loading users...</p>}
      {error && <p className="text-center text-red-500 bg-red-50 p-3 rounded-md">Error: {error}</p>}
      
      {!isLoading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {users.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && users.length === 0 && (
         <div className="text-center py-16 text-gray-500 bg-white rounded-lg shadow">
            <UsersIcon size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No users found.</p>
            <p className="text-sm">Consider adding new users to the system.</p>
         </div>
      )}

      <UserDetailModal
        user={selectedUserForView}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />

      <AddEditUserModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
        loggedInUserRole={loggedInUser?.role}
      />

      {/* Global styles for animations (optional) */}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeIn 0.3s ease-out, fadeInUp 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default UsersPage;

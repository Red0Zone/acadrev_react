"use client"; // Add this if you're using Next.js App Router

import React, { useState, useMemo, useEffect } from "react";
import { PlusCircle, Trash2, Search, ArrowUpDown, Edit, X } from "lucide-react"; // Added Edit and X icons

// Placeholder function for generating random logo URLs (replace with actual logic if needed)
const getRandomLogo = (seed) => `https://picsum.photos/seed/${seed}/40/40`;

// Initial placeholder university data
const initialUniversities = [
  {
    id: 1,
    name: "Stanford University",
    logo: getRandomLogo("stanford"),
    url: "https://www.stanford.edu",
  },
  {
    id: 2,
    name: "Massachusetts Institute of Technology (MIT)",
    logo: getRandomLogo("mit"),
    url: "https://web.mit.edu",
  },
  {
    id: 3,
    name: "Harvard University",
    logo: getRandomLogo("harvard"),
    url: "https://www.harvard.edu",
  },
  {
    id: 4,
    name: "University of Cambridge",
    logo: getRandomLogo("cambridge"),
    url: "https://www.cam.ac.uk",
  },
  {
    id: 5,
    name: "University of Oxford",
    logo: getRandomLogo("oxford"),
    url: "https://www.ox.ac.uk",
  },
];

// --- Modal Component ---
function UniversityModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState(""); // Optional: for custom logo URL
  const isEditing = !!initialData; // Check if we are editing

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setName(initialData.name);
        setUrl(initialData.url);
        setLogoUrl(initialData.logo); // Pre-fill logo if editing
      } else {
        // Reset form for adding
        setName("");
        setUrl("");
        setLogoUrl("");
      }
    }
  }, [isOpen, initialData, isEditing]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniData = {
      id: isEditing ? initialData.id : Date.now(), // Use existing ID or generate new one
      name,
      url,
      // Use provided logo or generate a random one if empty
      logo: logoUrl || getRandomLogo(name || `new${Date.now()}`),
    };
    onSave(uniData, isEditing);
  };

  return (
    <div className="fixed inset-0 bg-gray-100/80  flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Edit University" : "Add New University"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="uni-name" className="block text-sm font-medium text-gray-700">
              University Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="uni-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="uni-url" className="block text-sm font-medium text-gray-700">
              Website URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="uni-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://www.example.edu"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="uni-logo" className="block text-sm font-medium text-gray-700">
              Logo URL (Optional)
            </label>
            <input
              type="url"
              id="uni-logo"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://www.example.edu/logo.png"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
             <p className="text-xs text-gray-500 mt-1">If left empty, a placeholder logo will be used.</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? "Save Changes" : "Add University"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- Main University Management Page Component ---
function UniversityManagementPage() {
  const [universities, setUniversities] = useState(initialUniversities);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null); // Store uni data for editing

  // --- Event Handlers ---

  const handleDelete = (uniId, uniName) => {
    if (window.confirm(`Are you sure you want to delete ${uniName}?`)) {
      setUniversities((prevUnis) =>
        prevUnis.filter((uni) => uni.id !== uniId)
      );
      console.log(`Deleted university with ID: ${uniId}`);
      // Add actual API call for deletion here
    }
  };

  const handleOpenAddModal = () => {
    setEditingUniversity(null); // Ensure we are in "add" mode
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (university) => {
    setEditingUniversity(university); // Set the uni to edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUniversity(null); // Clear editing state
  };

  const handleSaveUniversity = (uniData, isEditing) => {
    if (isEditing) {
      // Update existing university
      setUniversities((prevUnis) =>
        prevUnis.map((uni) => (uni.id === uniData.id ? uniData : uni))
      );
      console.log("Updated university:", uniData);
      // Add actual API call for updating here
    } else {
      // Add new university
      setUniversities((prevUnis) => [...prevUnis, uniData]);
      console.log("Added new university:", uniData);
      // Add actual API call for adding here
    }
    handleCloseModal(); // Close modal after saving
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  // --- Derived State (Filtering and Sorting) ---

  const filteredAndSortedUniversities = useMemo(() => {
    let result = universities.filter((uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortAsc ? -1 : 1;
      if (nameA > nameB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [universities, searchTerm, sortAsc]);

  // --- Rendering ---

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        University Management
      </h1>

      {/* Controls: Search and Add */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
          />
        </div>
        <button
          onClick={handleOpenAddModal} // Changed to open modal
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition duration-150 ease-in-out w-full sm:w-auto justify-center"
        >
          <PlusCircle size={20} />
          Add University
        </button>
      </div>

      {/* University List Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Logo
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-1">
                  Name
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedUniversities.length > 0 ? (
              filteredAndSortedUniversities.map((uni) => (
                <tr key={uni.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={uni.logo}
                      alt={`${uni.name} logo`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200" // Added border
                      // Add error handling for images if needed
                      onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/40?text=N/A" }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {uni.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={uni.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-900 hover:underline"
                    >
                      Visit Website
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {/* Action Buttons Wrapper */}
                    <div className="flex justify-center items-center gap-3">
                       {/* Edit Button */}
                       <button
                        onClick={() => handleOpenEditModal(uni)} // Pass uni data to edit modal
                        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                        aria-label={`Edit ${uni.name}`}
                        title="Edit" // Tooltip
                      >
                        <Edit size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(uni.id, uni.name)}
                        className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                        aria-label={`Delete ${uni.name}`}
                        title="Delete" // Tooltip
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  {searchTerm ? "No universities found matching your search." : "No universities available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Universities */}
      <UniversityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUniversity}
        initialData={editingUniversity} // Pass data for editing, null for adding
      />
    </div>
  );
}

export default UniversityManagementPage;

"use client"; // Required for Next.js App Router

import React, { useState, useEffect, useContext, useMemo } from "react";
import { PlusCircle, Search, ArrowUpDown, Loader2, AlertCircle } from "lucide-react";
import { fetchUniversities, addUniversity, editUniversity, deleteUniversity } from "./functions";
import UniversityTable from "./components/UniversityTable";
import UniversityModalManager from "./components/UniversityModalManager";
import UniversityStaffView from "./components/UniversityStaffView";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

// Custom Debounce Hook for Search Optimization
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Main University Management Page Component
export default function University() {
  // Get user info from AuthContext
  const { user } = useAuth();
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "view", // view, add, edit
  });
  const [sortColumn, setSortColumn] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Check if user is admin or authority
  const isAdminOrAuthority = user && (user.role === "admin" || user.role === "authority");

  useEffect(() => {
    if (isAdminOrAuthority) {
      loadUniversities();
    } else {
      setLoading(false); // No need to load universities list for staff
    }
  }, [isAdminOrAuthority]);

  const loadUniversities = async () => {
    try {
      setLoading(true);
      const data = await fetchUniversities();
      setUniversities(data);
      console.log("Fetched universities:", data);
      setError(null);
    } catch (err) {
      console.error("Failed to load universities:", err);
      setError("Failed to load universities. Please try again later.");
      showError("Failed to load universities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredUniversities = universities.filter((university) => {
    const nameMatch = university.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    // You can add more fields to search here, for example:
    // const countryMatch = university.country?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    // const emailMatch = university.email?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    // return nameMatch || countryMatch || emailMatch;
    return nameMatch; 
  });

  const handleOpenModal = (mode, university = null) => {
    setSelectedUniversity(university);
    setModalState({
      isOpen: true,
      mode,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };

  const handleSaveUniversity = async (formData, isEditing) => {
    try {
      let savedUniversity;
      if (isEditing) {
        savedUniversity = await editUniversity(formData);
        setUniversities((prev) =>
          prev.map((uni) => (uni.id === savedUniversity.id ? savedUniversity : uni))
        );
        showSuccess("University updated successfully!");
      } else {
        savedUniversity = await addUniversity(formData);
        setUniversities((prev) => [...prev, savedUniversity]);
        showSuccess("University added successfully!");
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving university:", err);
      showError(err.message || "Failed to save university. Please try again.");
    }
  };

  const handleDeleteUniversity = async (universityId) => {
    if (!window.confirm("Are you sure you want to delete this university?")) {
      return;
    }

    try {
      await deleteUniversity(universityId);
      setUniversities((prev) => prev.filter((uni) => uni.id !== universityId));
      showSuccess("University deleted successfully!");
    } catch (err) {
      console.error("Error deleting university:", err);
      showError(err.message || "Failed to delete university. Please try again.");
    }
  };

  const handleSort = (column) => {
    setSortColumn(column);
    setSortAsc(column === sortColumn ? !sortAsc : true);
  };

  const sortedUniversities = useMemo(() => {
    const sorted = [...filteredUniversities];
    console.log('filteredUniversities', filteredUniversities);
    sorted.sort((a, b) => {
      const valA = a[sortColumn] ?? "";
      const valB = b[sortColumn] ?? "";
      const comparison = typeof valA === "number" && typeof valB === "number"
        ? valA - valB
        : String(valA).localeCompare(String(valB));
      return sortAsc ? comparison : -comparison;
    });
    return sorted;
  }, [filteredUniversities, sortColumn, sortAsc]);

  const renderSortableHeader = (label, columnKey) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort(columnKey)}>
      <div className="flex items-center gap-1">
        {label}
        {sortColumn === columnKey && (
          <ArrowUpDown size={14} className={sortAsc ? "" : "transform rotate-180"} />
        )}
      </div>
    </th>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <span className="ml-2 text-lg text-gray-700">Loading...</span>
    </div>
  );
  
  if (error) return (
    <div className="max-w-3xl mx-auto p-6 bg-red-50 border border-red-100 rounded-lg mt-8">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">An error occurred</h3>
          <div className="mt-2 text-sm text-red-700">{error}</div>
        </div>
      </div>
    </div>
  );
  
  // If user is not admin or authority, show the staff view
  if (!isAdminOrAuthority) {
    return <UniversityStaffView />;
  }

  // Continue with admin/authority view
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Universities</h1>
      
      {/* Search and Add University Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {user && user.role === 'authority' && (
          <button
            onClick={() => handleOpenModal("add")}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            <span>Add University</span>
          </button>
        )}
      </div>
      
      <UniversityTable
        universities={sortedUniversities} 
        onView={(uni) => handleOpenModal("view", uni)}
        onEdit={(uni) => handleOpenModal("edit", uni)}
        onDelete={handleDeleteUniversity}
        renderSortableHeader={renderSortableHeader}
      />

      <UniversityModalManager
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUniversity}
        universityData={selectedUniversity}
        mode={modalState.mode}
        userRole={user?.role}
      />
    </div>
  );
}
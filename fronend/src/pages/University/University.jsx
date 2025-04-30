"use client"; // Required for Next.js App Router

import React, { useState, useMemo, useEffect } from "react";
import { PlusCircle, Trash2, Search, ArrowUpDown, Edit, Loader2, AlertCircle } from "lucide-react";
import UniversityModal from "./UniversityModal";


// Custom Debounce Hook for Search Optimization

const getRandomLogo = (name) => `https://picsum.photos/seed/${encodeURIComponent(name)}/40/40`;
const API_Actions = {
  getAll: "universities/all",
  add: "universities/add",
  edit: "universities/edit/",
  delete: "universities/delete/",
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// University Modal Component

// Main University Management Page Component
export default function UniversityManagementPage() {
  const [universities, setUniversities] = useState([]);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:3000/";
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_BASE_URL+API_Actions.getAll, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) throw new Error(`Failed to fetch universities: ${response.statusText}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format from server.");
        setUniversities(data);
      } catch (err) {
        setError(err.message || "Failed to load universities.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniversities();
  }, [API_BASE_URL]);

  const filteredAndSortedUniversities = useMemo(() => {
    let result = [...universities];
    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      result = result.filter((uni) =>
        [uni.name, uni.country, uni.abbreviation].some((field) =>
          field?.toLowerCase().includes(lowerSearchTerm)
        )
      );
    }
    result.sort((a, b) => {
      const valA = a[sortColumn] ?? "";
      const valB = b[sortColumn] ?? "";
      const comparison = typeof valA === "number" && typeof valB === "number"
        ? valA - valB
        : String(valA).localeCompare(String(valB));
      return sortAsc ? comparison : -comparison;
    });
    return result;
  }, [universities, debouncedSearchTerm, sortColumn, sortAsc]);

  const handleDelete = async (uniId, uniName) => {
    if (!window.confirm(`Delete ${uniName}? This cannot be undone.`)) return;
    try {
      const response = await fetch(API_BASE_URL+API_Actions.delete+uniId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok){ throw new Error("Failed to delete university.") }
      else{
        alert(`University ${uniName} deleted successfully.`);
      }
      setUniversities((prev) => prev.filter((uni) => uni.id !== uniId));
    } catch (err) {
      setError(err.message || "Failed to delete university.");
    }
  };

  const handleSaveUniversity = async (uniData, isEditing) => {
    const url = isEditin
      ? API_BASE_URL + API_Actions.edit + uniData.id 
      : API_BASE_URL + API_Actions.add;
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(uniData),
      });
      if (!response.ok) throw new Error("Failed to save university.");
      const savedUniversity = await response.json();
      setUniversities((prev) =>
        isEditing
          ? prev.map((uni) => (uni.id === savedUniversity.id ? savedUniversity : uni))
          : [...prev, savedUniversity]
      );
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save university.");
      throw err;
    }
  };

  const handleSort = (column) => {
    setSortColumn(column);
    setSortAsc(column === sortColumn ? !sortAsc : true);
  };

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

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">University Management</h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search name, country, abbreviation..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
            disabled={isLoading}
            aria-label="Search universities"
          />
        </div>
        <button
          onClick={() => {
            setEditingUniversity(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 disabled:opacity-50"
          disabled={isLoading}
        >
          <PlusCircle size={20} />
          Add University
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-indigo-600 mr-3" size={24} />
          <span className="text-gray-600">Loading universities...</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle size={24} />
          <div>
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Logo</th>
                {renderSortableHeader("Name", "name")}
                {renderSortableHeader("Country", "country")}
                {renderSortableHeader("Email", "email")}
                {renderSortableHeader("Established", "established")}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {filteredAndSortedUniversities.length > 0 ? (
                filteredAndSortedUniversities.map((uni) => (
                  <tr key={uni.id} className={`even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150`}>
                    <td className="px-4 py-4">
                      <img
                        src={getRandomLogo(uni.name)}
                        alt={`${uni.name} logo`}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/40?text=Error")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{uni.name || "-"}</div>
                      <div className="text-xs text-gray-500">{uni.abbreviation || ""}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{uni.country || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{uni.email || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{uni.since || "-"}</td>
                    <td className="px-6 py-4">
                      {uni.website ? (
                        <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline text-center">
                          Visit
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setEditingUniversity(uni) || setIsModalOpen(true)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                        aria-label={`Edit ${uni.name}`}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(uni.id, uni.name)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 ml-2"
                        aria-label={`Delete ${uni.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    {debouncedSearchTerm ? "No universities found matching your search." : "No universities found. Add one!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <UniversityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUniversity}
        initialData={editingUniversity}
      />
    </div>
  );
}
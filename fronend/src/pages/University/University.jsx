"use client"; // Add this if you're using Next.js App Router

import React, { useState, useMemo, useEffect } from "react";
import { PlusCircle, Trash2, Search, ArrowUpDown, Edit } from "lucide-react"; // Removed unused X icon

// Placeholder function for generating random logo URLs (replace with actual logic if needed)
// Using a placeholder image URL for Al-Quds as the original image doesn't provide a URL
const getRandomLogo = (seed) => `https://picsum.photos/seed/${seed}/40/40`;

// --- Updated Initial University Data Structure & Data ---
const initialUniversities = [
  // Data based on the image for Al-Quds University
  {
    id: 'uni-alquds', // Using a string ID
    name: "جامعة القدس (Al-Quds University)",
    logo: getRandomLogo("alquds"),
    url: "https://www.alquds.edu/", // Found via search
    country: "فلسطين (Palestine)",
    abbreviation: "alquds",
    presidentName: "أ.د. عماد أبو كشك (Prof. Imad Abu Kishek)", // Added title, check if current
    presidentEmail: null, // Not provided
    qaOfficerName: "د. مرعي صبري (Dr. Marai Sabri)", // Found via search, assuming 'Mar'i' refers to him
    qaOfficerEmail: null, // Not provided
    address: "Main Campus: Abu Dis. Other campuses in Jerusalem, Sheikh Jarrah, Beit Hanina", // General address info
    phone: "+970-2-279-9901", // Example, find correct main number
    fax: "+970-2-279-6960",  // Example, find correct fax
    email: "info@alquds.edu", // Example, find correct general email
    institutionType: "جامعة عامة (Public University)",
    establishmentYear: 1984,
    studiesBeganYear: 1985,
  },
  // --- Adding new fields to existing sample data ---
  {
    id: 1,
    name: "Stanford University",
    logo: getRandomLogo("stanford"),
    url: "https://www.stanford.edu",
    country: "USA",
    abbreviation: "Stanford",
    presidentName: null,
    presidentEmail: null,
    qaOfficerName: null,
    qaOfficerEmail: null,
    address: null,
    phone: null,
    fax: null,
    email: null,
    institutionType: "Private",
    establishmentYear: 1885,
    studiesBeganYear: 1891,
  },
  {
    id: 2,
    name: "Massachusetts Institute of Technology (MIT)",
    logo: getRandomLogo("mit"),
    url: "https://web.mit.edu",
    country: "USA",
    abbreviation: "MIT",
    presidentName: null,
    presidentEmail: null,
    qaOfficerName: null,
    qaOfficerEmail: null,
    address: null,
    phone: null,
    fax: null,
    email: null,
    institutionType: "Private",
    establishmentYear: 1861,
    studiesBeganYear: 1865,
  },
  // Add the new fields similarly to Harvard, Cambridge, Oxford...
    {
    id: 3,
    name: "Harvard University",
    logo: getRandomLogo("harvard"),
    url: "https://www.harvard.edu",
    country: "USA",
    abbreviation: "Harvard",
    presidentName: null, presidentEmail: null, qaOfficerName: null, qaOfficerEmail: null, address: null, phone: null, fax: null, email: null, institutionType: "Private", establishmentYear: 1636, studiesBeganYear: 1636 // Approx
  },
  {
    id: 4,
    name: "University of Cambridge",
    logo: getRandomLogo("cambridge"),
    url: "https://www.cam.ac.uk",
    country: "UK",
    abbreviation: "Cambridge",
    presidentName: null, presidentEmail: null, qaOfficerName: null, qaOfficerEmail: null, address: null, phone: null, fax: null, email: null, institutionType: "Public", establishmentYear: 1209, studiesBeganYear: 1209 // Approx
  },
  {
    id: 5,
    name: "University of Oxford",
    logo: getRandomLogo("oxford"),
    url: "https://www.ox.ac.uk",
    country: "UK",
    abbreviation: "Oxford",
    presidentName: null, presidentEmail: null, qaOfficerName: null, qaOfficerEmail: null, address: null, phone: null, fax: null, email: null, institutionType: "Public", establishmentYear: 1096, studiesBeganYear: 1096 // Approx
  },
];

// --- Updated Modal Component ---
function UniversityModal({ isOpen, onClose, onSave, initialData }) {
  const isEditing = !!initialData;

  // State for all fields
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [country, setCountry] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [presidentName, setPresidentName] = useState("");
  const [presidentEmail, setPresidentEmail] = useState("");
  const [qaOfficerName, setQaOfficerName] = useState("");
  const [qaOfficerEmail, setQaOfficerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const [studiesBeganYear, setStudiesBeganYear] = useState("");

  // Populate state when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setUrl(initialData?.url || "");
      setLogoUrl(initialData?.logo || "");
      setCountry(initialData?.country || "");
      setAbbreviation(initialData?.abbreviation || "");
      setPresidentName(initialData?.presidentName || "");
      setPresidentEmail(initialData?.presidentEmail || "");
      setQaOfficerName(initialData?.qaOfficerName || "");
      setQaOfficerEmail(initialData?.qaOfficerEmail || "");
      setAddress(initialData?.address || "");
      setPhone(initialData?.phone || "");
      setFax(initialData?.fax || "");
      setEmail(initialData?.email || "");
      setInstitutionType(initialData?.institutionType || "");
      // Ensure years are treated as strings for the input, handle potential null/undefined
      setEstablishmentYear(initialData?.establishmentYear?.toString() || "");
      setStudiesBeganYear(initialData?.studiesBeganYear?.toString() || "");
    } else {
       // Optionally reset fields when closing if not editing
       if (!isEditing) {
         // Reset all fields
         setName(""); setUrl(""); setLogoUrl(""); setCountry(""); setAbbreviation("");
         setPresidentName(""); setPresidentEmail(""); setQaOfficerName(""); setQaOfficerEmail("");
         setAddress(""); setPhone(""); setFax(""); setEmail(""); setInstitutionType("");
         setEstablishmentYear(""); setStudiesBeganYear("");
       }
    }
  }, [isOpen, initialData, isEditing]); // Added isEditing dependency

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert years back to numbers, handle empty strings
    const estYear = establishmentYear ? parseInt(establishmentYear, 10) : null;
    const beganYear = studiesBeganYear ? parseInt(studiesBeganYear, 10) : null;

    if (establishmentYear && isNaN(estYear)) {
      alert("Establishment Year must be a valid number.");
      return;
    }
     if (studiesBeganYear && isNaN(beganYear)) {
      alert("Studies Began Year must be a valid number.");
      return;
    }


    const universityData = {
      // Keep existing ID if editing, generate new one if adding
      id: isEditing ? initialData.id : Date.now(),
      name,
      url,
      logo: logoUrl || getRandomLogo(name || `new${Date.now()}`), // Use provided or generate
      country,
      abbreviation,
      presidentName: presidentName || null, // Ensure null if empty
      presidentEmail: presidentEmail || null,
      qaOfficerName: qaOfficerName || null,
      qaOfficerEmail: qaOfficerEmail || null,
      address: address || null,
      phone: phone || null,
      fax: fax || null,
      email: email || null,
      institutionType: institutionType || null,
      establishmentYear: estYear,
      studiesBeganYear: beganYear,
    };

    onSave(universityData, isEditing);
    // onClose(); // Keep modal open on error, close handled by onSave success in parent
  };

  // Helper for label styling
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  // Helper for input styling
  const inputClass = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm";

  return (
    <div
      className="fixed inset-0 bg-gray-100/50  backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn w-full h-full"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-white py-8 px-10 rounded-xl shadow-2xl max-w-5xl w-full relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary rounded-t-xl"></div>
        <button
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="mt-3 text-primary mb-6 text-2xl font-bold">
          {isEditing ? "Edit University Details" : "Add New University"}
        </h2>

        {/* Form - Using Grid for better layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Column 1 */}
          <div className="md:col-span-1">
            <label htmlFor="uni-name" className={labelClass}>
              University Name <span className="text-red-500">*</span>
            </label>
            <input type="text" id="uni-name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-abbreviation" className={labelClass}>
              Abbreviation
            </label>
            <input type="text" id="uni-abbreviation" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-url" className={labelClass}>
              Website URL <span className="text-red-500">*</span>
            </label>
            <input type="url" id="uni-url" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://www.example.edu" className={inputClass} />
          </div>
           <div className="md:col-span-1">
            <label htmlFor="uni-logo" className={labelClass}>
              Logo URL
            </label>
            <input type="url" id="uni-logo" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://www.example.edu/logo.png" className={inputClass} />
             <p className="text-xs text-gray-500 mt-1">If empty, a placeholder will be used.</p>
          </div>
           <div className="md:col-span-1">
            <label htmlFor="uni-country" className={labelClass}>
              Country
            </label>
            <input type="text" id="uni-country" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
          </div>
           <div className="md:col-span-1">
            <label htmlFor="uni-type" className={labelClass}>
              Institution Type
            </label>
            <input type="text" id="uni-type" value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} placeholder="e.g., Public, Private" className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-est-year" className={labelClass}>
              Establishment Year
            </label>
            <input type="number" id="uni-est-year" value={establishmentYear} onChange={(e) => setEstablishmentYear(e.target.value)} placeholder="e.g., 1984" className={inputClass} />
          </div>
           <div className="md:col-span-1">
            <label htmlFor="uni-began-year" className={labelClass}>
              Studies Began Year
            </label>
            <input type="number" id="uni-began-year" value={studiesBeganYear} onChange={(e) => setStudiesBeganYear(e.target.value)} placeholder="e.g., 1985" className={inputClass} />
          </div>
          <div className="md:col-span-2"> {/* Full width for address */}
            <label htmlFor="uni-address" className={labelClass}>
              Full Address
            </label>
            <textarea id="uni-address" value={address} onChange={(e) => setAddress(e.target.value)} rows="2" className={inputClass}></textarea>
          </div>

          {/* Column 2 */}
          <div className="md:col-span-1">
            <label htmlFor="uni-president" className={labelClass}>
              President Name
            </label>
            <input type="text" id="uni-president" value={presidentName} onChange={(e) => setPresidentName(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-president-email" className={labelClass}>
              President Email
            </label>
            <input type="email" id="uni-president-email" value={presidentEmail} onChange={(e) => setPresidentEmail(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-qa-officer" className={labelClass}>
              QA Officer Name
            </label>
            <input type="text" id="uni-qa-officer" value={qaOfficerName} onChange={(e) => setQaOfficerName(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-qa-email" className={labelClass}>
              QA Officer Email
            </label>
            <input type="email" id="uni-qa-email" value={qaOfficerEmail} onChange={(e) => setQaOfficerEmail(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-phone" className={labelClass}>
              Phone Number
            </label>
            <input type="tel" id="uni-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="uni-fax" className={labelClass}>
              Fax Number
            </label>
            <input type="tel" id="uni-fax" value={fax} onChange={(e) => setFax(e.target.value)} className={inputClass} />
          </div>
           <div className="md:col-span-1">
            <label htmlFor="uni-email" className={labelClass}>
              General Email
            </label>
            <input type="email" id="uni-email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>


          {/* Form Actions - Full Span */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200">
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
              {isEditing ? "Save Changes" : "Add University"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Updated Main University Management Page Component ---
function UniversityManagementPage() {
  const [universities, setUniversities] = useState(initialUniversities);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name"); // Track sorting column
  const [sortAsc, setSortAsc] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);

  // --- Event Handlers ---

  const handleDelete = (uniId, uniName) => {
    if (window.confirm(`Are you sure you want to delete ${uniName}? This action cannot be undone.`)) {
      setUniversities((prevUnis) =>
        prevUnis.filter((uni) => uni.id !== uniId)
      );
      console.log(`Deleted university with ID: ${uniId}`);
      // TODO: Add actual API call for deletion here
    }
  };

  const handleOpenAddModal = () => {
    setEditingUniversity(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (university) => {
    setEditingUniversity(university);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUniversity(null);
  };

  // Updated Save Handler
  const handleSaveUniversity = (uniData, isEditing) => {
    try {
      if (isEditing) {
        setUniversities((prevUnis) =>
          prevUnis.map((uni) => (uni.id === uniData.id ? { ...uni, ...uniData } : uni)) // Ensure full update
        );
        console.log("Updated university:", uniData);
        // TODO: Add actual API call for updating here (PUT/PATCH)
      } else {
        // Ensure new uni has all fields, even if null
        const newUni = { ...initialUniversities[0], ...uniData, id: Date.now() }; // Use a template structure + new data + new ID
         // Reset potentially missing fields to null/defaults if not provided by modal save
         Object.keys(initialUniversities[0]).forEach(key => {
            if (newUni[key] === undefined) {
                newUni[key] = null; // Or appropriate default
            }
         });
        // Override specific defaults
        newUni.logo = uniData.logo || getRandomLogo(uniData.name || `new${Date.now()}`);
        newUni.id = Date.now(); // Ensure a unique ID if Date.now() was used before save


        setUniversities((prevUnis) => [...prevUnis, newUni]);
        console.log("Added new university:", newUni);
        // TODO: Add actual API call for adding here (POST)
      }
      handleCloseModal(); // Close modal only on successful save
    } catch (error) {
      console.error("Error saving university:", error);
      // Optional: Show an error message to the user
      alert("Failed to save university data. Please check the console for errors.");
    }
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Updated Sort Handler
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true); // Default to ascending when changing column
    }
  };

  // --- Derived State (Filtering and Sorting) ---

  const filteredAndSortedUniversities = useMemo(() => {
    let result = universities.filter((uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.country?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search country
      uni.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) // Search abbreviation
    );

    result.sort((a, b) => {
      const valA = a[sortColumn] ?? ''; // Use empty string for null/undefined
      const valB = b[sortColumn] ?? '';

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
          comparison = valA - valB;
      } else if (typeof valA === 'string' && typeof valB === 'string') {
          comparison = valA.toLowerCase().localeCompare(valB.toLowerCase());
      } else {
          // Basic comparison for mixed types or others
          if (valA < valB) comparison = -1;
          if (valA > valB) comparison = 1;
      }


      return sortAsc ? comparison : comparison * -1;
    });

    return result;
  }, [universities, searchTerm, sortColumn, sortAsc]);

  // --- Helper to render Sortable Header ---
  const renderSortableHeader = (label, columnKey) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-150"
      onClick={() => handleSort(columnKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortColumn === columnKey && <ArrowUpDown size={14} />}
      </div>
    </th>
  );


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
            placeholder="Search name, country, abbreviation..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
          />
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition duration-150 ease-in-out w-full sm:w-auto justify-center"
        >
          <PlusCircle size={20} />
          Add University
        </button>
      </div>

      {/* University List Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto"> {/* Added overflow-x-auto */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Logo
              </th>
              {renderSortableHeader("Name", "name")}
              {renderSortableHeader("Country", "country")}
              {renderSortableHeader("Type", "institutionType")}
              {renderSortableHeader("Established", "establishmentYear")}
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
                <tr key={uni.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={uni.logo || "https://via.placeholder.com/40?text=N/A"} // Fallback if logo is null/empty
                      alt={`${uni.name || 'University'} logo`}
                      className="w-10 h-10 rounded-full object-contain border border-gray-200 bg-gray-100" // Changed object-cover to object-contain
                      onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/40?text=Error" }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {uni.name || "-"}
                    </div>
                     <div className="text-xs text-gray-500">{uni.abbreviation || ""}</div> {/* Display abbreviation below name */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {uni.country || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {uni.institutionType || "-"}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {uni.establishmentYear || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {uni.url ? (
                      <a
                        href={uni.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-900 hover:underline"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">No URL</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-3">
                       <button
                        onClick={() => handleOpenEditModal(uni)}
                        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out p-1 hover:bg-blue-100 rounded" // Added padding/bg for better click area
                        aria-label={`Edit ${uni.name || 'university'}`}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(uni.id, uni.name)}
                        className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out p-1 hover:bg-red-100 rounded" // Added padding/bg
                        aria-label={`Delete ${uni.name || 'university'}`}
                        title="Delete"
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
                  colSpan="7" // Updated colspan to match new number of columns
                  className="px-6 py-10 text-center text-gray-500"
                >
                  {searchTerm ? "No universities found matching your search." : "No universities available. Add one!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <UniversityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUniversity}
        initialData={editingUniversity}
      />
    </div>
  );
}

export default UniversityManagementPage;


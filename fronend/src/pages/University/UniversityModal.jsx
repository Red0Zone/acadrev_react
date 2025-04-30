import React, { useState, useEffect } from "react";
function UniversityModal({ isOpen, onClose, onSave, initialData }) {
    const isEditing = !!initialData;
    const [formData, setFormData] = useState({
      name: "",
      url: "",
      logo: "",
      country: "",
      abbreviation: "",
      shortName: "",
      presidentName: "",
      presidentEmail: "",
      qaOfficerName: "",
      qaOfficerEmail: "",
      address: "",
      phone: "",
      fax: "",
      email: "",
      institutionType: "",
      establishmentYear: "",
      studiesBeganYear: "",
    });
    const [formError, setFormError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
  
    useEffect(() => {
      if (isOpen) {
        setFormError(null);
        setFormData({
          name: initialData?.name || "",
          url: initialData?.url || "",
          logo: initialData?.logo || "",
          country: initialData?.country || "",
          abbreviation: initialData?.abbreviation || "",
          presidentName: initialData?.presidentName || "",
          presidentEmail: initialData?.presidentEmail || "",
          qaOfficerName: initialData?.qaOfficerName || "",
          qaOfficerEmail: initialData?.qaOfficerEmail || "",
          address: initialData?.address || "",
          phone: initialData?.phone || "",
          fax: initialData?.fax || "",
          email: initialData?.email || "",
          institutionType: initialData?.institutionType || "",
          establishmentYear: initialData?.establishmentYear?.toString() || "",
          studiesBeganYear: initialData?.studiesBeganYear?.toString() || "",
        });
      } else {
        setFormData({
          name: "",
          url: "",
          logo: "",
          country: "",
          abbreviation: "",
          presidentName: "",
          presidentEmail: "",
          qaOfficerName: "",
          qaOfficerEmail: "",
          address: "",
          phone: "",
          fax: "",
          email: "",
          institutionType: "",
          establishmentYear: "",
          studiesBeganYear: "",
        });
      }
    }, [isOpen, initialData]);
  
    if (!isOpen) return null;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormError(null);
      setIsSaving(true);
  
      const { establishmentYear, studiesBeganYear, presidentEmail, qaOfficerEmail, email } = formData;
      const currentYear = new Date().getFullYear();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (establishmentYear && (isNaN(establishmentYear) || establishmentYear < 1000 || establishmentYear > currentYear + 5)) {
        setFormError("Establishment Year must be a valid year.");
        setIsSaving(false);
        return;
      }
      if (studiesBeganYear && (isNaN(studiesBeganYear) || studiesBeganYear < 1000 || studiesBeganYear > currentYear + 5)) {
        setFormError("Studies Began Year must be a valid year.");
        setIsSaving(false);
        return;
      }
      if (presidentEmail && !emailRegex.test(presidentEmail)) {
        setFormError("President Email is not valid.");
        setIsSaving(false);
        return;
      }
      if (qaOfficerEmail && !emailRegex.test(qaOfficerEmail)) {
        setFormError("QA Officer Email is not valid.");
        setIsSaving(false);
        return;
      }
      if (email && !emailRegex.test(email)) {
        setFormError("General Email is not valid.");
        setIsSaving(false);
        return;
      }
  
      const universityData = {
        ...(isEditing && { id: initialData.id }),
        ...formData,
        establishmentYear: establishmentYear ? parseInt(establishmentYear, 10) : null,
        studiesBeganYear: studiesBeganYear ? parseInt(studiesBeganYear, 10) : null,
      };
  
      try {
        await onSave(universityData, isEditing);
      } catch (error) {
        setFormError(error.message || "Failed to save university.");
      } finally {
        setIsSaving(false);
      }
    };
  
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const inputClass = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100";
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="bg-white py-8 px-10 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close modal">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">{isEditing ? "Edit University" : "Add University"}</h2>
          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Name <span className="text-red-500">*</span></label>
              <input name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Website URL <span className="text-red-500">*</span></label>
              <input name="url" type="url" value={formData.url} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input name="logo" type="url" value={formData.logo} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Country <span className="text-red-500">*</span></label>
              <input name="country" value={formData.country} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Establishment Year</label>
              <input name="establishmentYear" type="number" value={formData.establishmentYear} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Short Name</label>
              <input name="establishmentYear"  value={formData.shortName} onChange={handleChange} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>President Name</label>
              <input name="presidentName" value={formData.presidentName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>President Email</label>
              <input name="presidentEmail" type="email" value={formData.presidentEmail} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>QA Officer Name</label>
              <input name="qaOfficerName" value={formData.qaOfficerName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>QA Officer Email</label>
              <input name="qaOfficerEmail" type="email" value={formData.qaOfficerEmail} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Fax</label>
              <input name="fax" type="tel" value={formData.fax} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>General Email <span className="text-red-500">*</span></label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : (
                  isEditing ? "Save Changes" : "Add University"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default UniversityModal;
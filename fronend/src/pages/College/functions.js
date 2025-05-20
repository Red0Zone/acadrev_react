// functions.js

// TODO: Replace with your actual API base URL
import { API_BASE_URL } from "./apiconfig"; 
import { API_Actions } from "./apiconfig"; 
// TODO: Adjust these paths to match your API endpoints


// Helper to get common headers, including Authorization
const getAuthHeaders = () => {
  const authToken = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
  };
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  return headers;
};

/**
 * Fetches all colleges from the API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of college objects.
 * @throws {Error} If the API request fails or returns invalid data.
 */
export const fetchColleges = async () => {
  const response = await fetch(API_BASE_URL + API_Actions.getAll, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch Colleges: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format received from server for Colleges list.");
  }
  return data;
};

/**
 * Adds a new College via the API.
 * @param {Object} collegeData - The data for the new College.
 * @returns {Promise<Object>} A promise that resolves to the newly added College object.
 * @throws {Error} If the API request fails.
 */
export const addCollege = async (collegeData) => {
  const response = await fetch(API_BASE_URL + API_Actions.add, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(collegeData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add college: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }
  return await response.json();
};

/**
 * Edits an existing college via the API.
 * @param {Object} collegeData - The data for the college to update, must include an 'id'.
 * @returns {Promise<Object>} A promise that resolves to the updated college object.
 * @throws {Error} If the API request fails or collegeData.id is missing.
 */
export const editCollege = async (collegeData) => {
  if (!collegeData.id) {
    throw new Error("College ID is required for editing.");
  }
  const response = await fetch(API_BASE_URL + API_Actions.edit, { // Assuming API_Actions.edit is configured for colleges or is generic
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(collegeData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to edit college: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }
  return await response.json();
};

/**
 * Deletes a college via the API.
 * @param {string|number} collegeId - The ID of the college to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is successful.
 * @throws {Error} If the API request fails.
 */
export const deleteCollege = async (collegeId) => {
  const response = await fetch(API_BASE_URL + API_Actions.delete + collegeId, { // Assuming API_Actions.delete is configured for colleges or is generic
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete college: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }
  // DELETE requests might not return a body, or might return a confirmation.
  // If your API returns a specific success message, you might want to parse and return it.
  // For now, a successful status code is sufficient.
};

/**
 * Fetches a single college by ID from the API.
 * @param {string|number} collegeId - The ID of the college to fetch.
 * @returns {Promise<Object>} A promise that resolves to the college object.
 * @throws {Error} If the API request fails or returns invalid data.
 */
export const fetchCollegeById = async (collegeId) => {
  // Assuming the endpoint for a single college is /colleges/:id
  // If API_Actions includes a getById, prefer that: e.g., API_BASE_URL + API_Actions.getById + collegeId
  const response = await fetch(`${API_BASE_URL}/collages/${collegeId}`, { 
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch college: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Fetches the current user's college information (for college accounts).
 * This uses the /my-college endpoint that identifies the college from the auth token.
 * @returns {Promise<Object>} A promise that resolves to the user's college object.
 * @throws {Error} If the API request fails, returns invalid data, or user isn't associated with a college.
 */
export const fetchMyCollege = async () => {
  // Assuming the endpoint for the user's college is /colleges/me
  const response = await fetch(`${API_BASE_URL}/collages/me`, { 
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch your college: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Fetches all universities from the API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of university objects.
 * @throws {Error} If the API request fails or returns invalid data.
 */
export const fetchUniversities = async () => {
  const response = await fetch(API_BASE_URL + API_Actions.getAllUni, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch universities: ${response.statusText} (Status: ${response.status}) - ${errorText}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format received from server for universities list.");
  }
  return data;
};

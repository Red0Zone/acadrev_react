export const API_BASE_URL = "http://localhost:3000/"; // Or from environment variable

export const API_Actions = {
  getAll: "collages/all",
  add: "collages/add",
  edit: "collages/update", // Note: ID is appended later
  delete: "/collages/me/", // Note: ID is appended later
  getAllUni: "universities/all",
};

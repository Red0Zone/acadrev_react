
export const API_BASE_URL = "http://localhost:3000/"; // Or from environment variable

export const API_Actions = {
  getAll: "colleges/all",
  add: "colleges/add",
  edit: "colleges/update", // Note: ID is appended later
  delete: "/colleges/me/", // Note: ID is appended later
  getAllUni: "universities/all",
  getCollegesByUni: "colleges/uniAll",
};

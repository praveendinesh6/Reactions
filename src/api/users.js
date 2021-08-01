import API from "../adapter/rest";

export function fetchUsers() {
  return API.get("users").then((response) => {
    return response.data;
  });
}

export const UsersAPI = { fetchUsers }
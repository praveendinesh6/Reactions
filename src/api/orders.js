import API from "../adapter/rest";

export function fetchOrders() {
  return API.get("orders").then((response) => {
    return response.data;
  });
}

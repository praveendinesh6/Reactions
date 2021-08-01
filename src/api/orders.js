import API from "../adapter/rest";

function fetchOrders() {
  return API.get("orders").then((response) => {
    return response.data;
  });
}

export const OrdersAPI = { fetchOrders }
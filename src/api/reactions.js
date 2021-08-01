import API from "../adapter/rest";

export function fetchReactions() {
  return API.get("reactions").then((response) => {
    return response.data;
  });
}

export function fetchReactionForOrders() {
  return API.get("user_content_reactions").then((response) => {
    return response.data;
  });
}

export function addOrderReaction(data) {
  return API.post("user_content_reactions", data).then((response) => {
    return response.data;
  });
}

export function removeOrderReaction(orderId) {
  return API.delete(`user_content_reactions/${orderId}`);
}

export const ReactionsAPI = { fetchReactions, fetchReactionForOrders, addOrderReaction, removeOrderReaction }
import API from "../adapter/rest";
import { v4 as uuidv4 } from "uuid";

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

export function addOrderReaction(reactionId, userId, orderId) {
  let data = {
    id: uuidv4(),
    reaction_id: reactionId,
    user_id: userId,
    content_id: orderId,
  };
  return API.post("user_content_reactions", data).then(() => {
    return data;
  });
}

export function removeOrderReaction(orderId) {
  return API.delete(`user_content_reactions/${orderId}`);
}

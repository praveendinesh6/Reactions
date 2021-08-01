import { useState, useEffect } from "react";
import { ReactionsAPI } from "../api/reactions";

export function useFetchContentReactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const addContentReaction = (reactionId, currentUserId, orderId) => {
    let newReactionData = {
      id: new Date().getUTCMilliseconds(),
      reaction_id: reactionId,
      user_id: currentUserId,
      content_id: orderId,
    };
    setData([...data, newReactionData]);
    return ReactionsAPI.addOrderReaction(newReactionData).catch(() => {
      setData(
        data.filter((order) => {
          return order.id !== newReactionData["id"];
        })
      );
    });
  };
  const removeContentReaction = (userContentItemId) => {
    const index = data.findIndex(
      (reactionContent) => reactionContent.id === userContentItemId
    );
    let removedElement = data.splice(index, 1);
    setData([...data]);
    return ReactionsAPI.removeOrderReaction(userContentItemId).catch(() => {
      setData([...data, removedElement[0]]);
    });
  };

  useEffect(() => {
    ReactionsAPI.fetchReactionForOrders()
      .then((responseData) => {
        setData(responseData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading, data, addContentReaction, removeContentReaction };
}

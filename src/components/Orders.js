import { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import { groupBy } from "lodash";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Orders({ currentUserId }) {
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contentReactionsList, setContentReactionsList] = useState([]);

  const contentReactionsMap = groupBy(contentReactionsList, "content_id");

  function fetchOrders() {
    setIsLoading(true);
    return axios
      .get("https://artful-iudex.herokuapp.com/orders")
      .then((response) => {
        setOrdersList(response["data"]);
      })
      .catch(() => {
        setErrorMessage("Error while fetching orders list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchContentReactions() {
    return axios
      .get(`https://artful-iudex.herokuapp.com/user_content_reactions`)
      .then((response) => {
        setContentReactionsList(response.data);
      });
  }

  function handleRemoveReaction(userContentReactionInfo) {
    return axios
      .delete(
        `https://artful-iudex.herokuapp.com/user_content_reactions/${userContentReactionInfo.id}`
      )
      .then(() => {
        setContentReactionsList(
          contentReactionsList.filter((order) => {
            return order.id !== userContentReactionInfo.id;
          })
        );
      });
  }
  function handleAddReaction(orderId, reactionId) {
    let data = {
      reaction_id: reactionId,
      user_id: currentUserId,
      content_id: orderId,
    };
    return axios
      .post("https://artful-iudex.herokuapp.com/user_content_reactions/", data)
      .then(() => {
        data.id = uuidv4();
        setContentReactionsList([...contentReactionsList, data]);
      });
  }

  useEffect(() => {
    fetchOrders();
    fetchContentReactions();
  }, []);

  return (
    <div className="flex overscroll-y-none flex-col">
      {errorMessage && (
        <div className="w-48 mx-auto text-red">{errorMessage}</div>
      )}
      <div className="w-6/12 m-auto flex flex-col mt-8">
        {isLoading
          ? "Loading orders list"
          : ordersList.map((orderItem) => (
              <OrderItem
                orderItem={orderItem}
                key={orderItem.id}
                userContentReactionsList={contentReactionsMap[orderItem.id]}
                handleRemoveReaction={handleRemoveReaction}
                handleAddReaction={handleAddReaction}
              />
            ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUserId: state.currentUserId,
  };
}

export default connect(mapStateToProps)(Orders);

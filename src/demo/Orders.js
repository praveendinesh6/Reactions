import { useState, useEffect } from "react";

import OrderItem from "./OrderItem";
import { groupBy } from "lodash";
import { connect } from "react-redux";
import {
  fetchReactionForOrders,
  addOrderReaction,
  removeOrderReaction,
} from "../api/reactions";
import { fetchOrders } from "../api/orders";
import PropTypes from 'prop-types';

function Orders({ currentUserId }) {
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contentReactionsList, setContentReactionsList] = useState([]);

  const contentReactionsMap = groupBy(contentReactionsList, "content_id");

  function fetchOrdersList() {
    setIsLoading(true);
    return fetchOrders()
      .then((responseData) => {
        setOrdersList(responseData);
      })
      .catch(() => {
        setErrorMessage("Error while fetching orders list");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchContentReactions() {
    return fetchReactionForOrders().then((responseData) => {
      setContentReactionsList(responseData);
    });
  }

  function handleRemoveReaction(userContentReactionInfo) {
    return removeOrderReaction(userContentReactionInfo.id).then(() => {
      setContentReactionsList(
        contentReactionsList.filter((order) => {
          return order.id !== userContentReactionInfo.id;
        })
      );
    });
  }
  function handleAddReaction(orderId, reactionId) {
    return addOrderReaction(reactionId, currentUserId, orderId).then(
      (responseData) => {
        setContentReactionsList([...contentReactionsList, responseData]);
      }
    );
  }

  useEffect(() => {
    fetchOrdersList();
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

Orders.propTypes = {
  currentUserId: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Orders);

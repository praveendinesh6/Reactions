import { useState, useEffect } from "react";
import UserReactions from "./UserReactions";
import axios from "axios";
import { connect } from "react-redux";

function OrderItem({ orderItem, currentUserId }) {
  const [userContentReactionsList, setuserContentReactionsList] = useState([]);

  function fetchUserReactions() {
    return axios
      .get(
        `https://artful-iudex.herokuapp.com/user_content_reactions?content_id=${orderItem.id}`
      )
      .then((response) => {
        setuserContentReactionsList(response.data);
      });
  }

  function handleRemoveReaction(userContentReactionInfo) {
    return axios
      .delete(
        `https://artful-iudex.herokuapp.com/user_content_reactions/${userContentReactionInfo.id}`
      )
      .then(() => {
        setuserContentReactionsList(
          userContentReactionsList.filter((order) => {
            return order.id !== userContentReactionInfo.id;
          })
        );
      });
  }
  function handleAddReaction(reactionId) {
    let data = {
      reaction_id: reactionId,
      user_id: currentUserId,
      content_id: orderItem.id,
    };
    return axios
      .post("https://artful-iudex.herokuapp.com/user_content_reactions/", data)
      .then(() => {
        data.id = userContentReactionsList.length + 1;
        setuserContentReactionsList([...userContentReactionsList, data]);
      });
  }
  function handleReactionClicked(reactionId) {
    let userContentReactionInfo = userContentReactionsList.find((orderInfo) => {
      return (
        orderInfo.reaction_id === reactionId &&
        orderInfo.user_id === currentUserId
      );
    });
    if (userContentReactionInfo) {
      handleRemoveReaction(userContentReactionInfo);
    } else {
      handleAddReaction(reactionId);
    }
  }

  useEffect(() => {
    fetchUserReactions();
  }, []);

  return (
    <div className="border border-gray-500 rounded mb-4">
      <div className="grid grid-rows-3 grid-flow-col gap-4 p-4 pl-12">
        <div>
          <div className="text-gray-500">Item Name</div>
          <div>{orderItem.item}</div>
        </div>
        <div>
          <div className="text-gray-500">Quantity</div>
          <div>{orderItem.quantity}</div>
        </div>
        <div>
          <div className="text-gray-500">Assignee Name</div>
          <div>{orderItem.representative_name}</div>
        </div>
        <div>
          <div className="text-gray-500">Region</div>
          <div>{orderItem.region}</div>
        </div>
        <div>
          <div className="text-gray-500">Order Date</div>
          <div>{orderItem.order_date}</div>
        </div>
        <div>
          <div className="text-gray-500">Total</div>
          <div>${orderItem.total}</div>
        </div>
      </div>
      <UserReactions
        userContentReactionsList={userContentReactionsList}
        handleReactionClicked={handleReactionClicked}
      />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    reactionsList: state.reactionsList,
    currentUserId: state.currentUserId,
  };
}

export default connect(mapStateToProps)(OrderItem);

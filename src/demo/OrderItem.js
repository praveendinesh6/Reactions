import UserReactions from "../components/UserReactions";
import { connect } from "react-redux";

function OrderItem({
  orderItem,
  userContentReactionsList = [],
  handleRemoveReaction,
  handleAddReaction,
  currentUserId,
}) {
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
      handleAddReaction(orderItem.id, reactionId);
    }
  }

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
    currentUserId: state.currentUserId,
  };
}

export default connect(mapStateToProps)(OrderItem);

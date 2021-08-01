import UserReactions from "../components/UserReactions";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

function OrderItem({
  orderItem,
  userContentReactionsList = [],
  handleRemoveReaction,
  handleAddReaction
}) {
  const currentUserId = useSelector((state) => state.currentUserId)

  function handleReactionClicked(reactionId) {
    let userContentReactionInfo = userContentReactionsList.find((orderInfo) => {
      return (
        orderInfo.reaction_id === reactionId &&
        orderInfo.user_id === currentUserId
      );
    });
    if (userContentReactionInfo) {
      handleRemoveReaction(userContentReactionInfo.id);
    } else {
      handleAddReaction(reactionId, currentUserId, orderItem.id);
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
          <div>{orderItem.quantity ? orderItem.quantity : '~'}</div>
        </div>
        <div>
          <div className="text-gray-500">Assignee Name</div>
          <div>{orderItem.representative_name ? orderItem.representative_name : '~'}</div>
        </div>
        <div>
          <div className="text-gray-500">Region</div>
          <div>{orderItem.region ? orderItem.region : '~'}</div>
        </div>
        <div>
          <div className="text-gray-500">Order Date</div>
          <div>{orderItem.order_date ? orderItem.order_date : '~'}</div>
        </div>
        <div>
          <div className="text-gray-500">Unit Cost</div>
          <div>${orderItem.unit_cost}</div>
        </div>
      </div>
      <UserReactions
        userContentReactionsList={userContentReactionsList}
        handleReactionClicked={handleReactionClicked}
      />
    </div>
  );
}

OrderItem.propTypes = {
  orderItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    item: PropTypes.string.isRequired,
    unit_cost: PropTypes.number.isRequired,
    order_date: PropTypes.string,
    quantity: PropTypes.number,
    region: PropTypes.string,
    representative_name: PropTypes.string
  }),
  userContentReactionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    reaction_id: PropTypes.number.isRequired,
  })),
  handleRemoveReaction: PropTypes.func.isRequired,
  handleAddReaction: PropTypes.func.isRequired,
}

export default OrderItem;

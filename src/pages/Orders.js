import OrderItem from "./OrderItem";
import { groupBy } from "lodash";
import { useFetchOrders } from "../hooks/orders.js";
import { useFetchContentReactions } from "../hooks/reactions.js";

function Orders() {
  const {
    isLoading: isOrdersLoading,
    data: ordersList,
    errorMessage: ordersListErrorMessage,
  } = useFetchOrders();

  const {
    isLoading: isContentReactionsLoading,
    data: contentReactionsList,
    addContentReaction: handleAddReaction,
    removeContentReaction: handleRemoveReaction,
  } = useFetchContentReactions();
  const contentReactionsMap = groupBy(contentReactionsList, "content_id");

  return (
    <div className="flex overscroll-y-none flex-col">
      {ordersListErrorMessage ? (
        <div className="w-48 mx-auto text-red">{ordersListErrorMessage}</div>
      ) : null}
      <div className="w-6/12 m-auto flex flex-col mt-8">
        {isOrdersLoading || isContentReactionsLoading
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

export default Orders;

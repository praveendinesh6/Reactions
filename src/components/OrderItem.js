import { useState, useEffect } from "react";
import UserReactions from './UserReactions';
import axios from "axios";
import { connect } from 'react-redux';

const userContentReactions = [
  {
    "id": 1,
    "user_id": 20,
    "reaction_id": 3,
    "content_id": 1
  },
  {
    "id": 4,
    "user_id": 14,
    "reaction_id": 4,
    "content_id": 1
  },
  {
    "id": 7,
    "user_id": 8,
    "reaction_id": 5,
    "content_id": 1
  },
  {
    "id": 8,
    "user_id": 20,
    "reaction_id": 2,
    "content_id": 1
  },
  {
    "id": 9,
    "user_id": 23,
    "reaction_id": 6,
    "content_id": 1
  },
  {
    "id": 10,
    "user_id": 11,
    "reaction_id": 5,
    "content_id": 1
  },
  {
    "id": 11,
    "user_id": 21,
    "reaction_id": 6,
    "content_id": 1
  },
  {
    "id": 13,
    "user_id": 12,
    "reaction_id": 3,
    "content_id": 1
  },
  {
    "id": 14,
    "user_id": 4,
    "reaction_id": 5,
    "content_id": 1
  },
  {
    "id": 15,
    "user_id": 12,
    "reaction_id": 5,
    "content_id": 1
  },
  {
    "id": 17,
    "user_id": 9,
    "reaction_id": 2,
    "content_id": 1
  },
  {
    "id": 21,
    "user_id": 10,
    "reaction_id": 4,
    "content_id": 1
  },
  {
    "id": 24,
    "user_id": 25,
    "reaction_id": 5,
    "content_id": 1
  },
  {
    "id": 25,
    "user_id": 25,
    "reaction_id": 1,
    "content_id": 1
  },
  {
    "id": 27,
    "user_id": 23,
    "reaction_id": 3,
    "content_id": 1
  },
  {
    "id": 28,
    "user_id": 11,
    "reaction_id": 2,
    "content_id": 1
  },
  {
    "id": 29,
    "user_id": 10,
    "reaction_id": 1,
    "content_id": 1
  }
]


function OrderItem({ orderItem, currentUserId }) {
  const [userContentReactionsList, setuserContentReactionsList] = useState(userContentReactions)

  function fetchUserReactions() {
    return axios
      .get(`https://artful-iudex.herokuapp.com/user_content_reactions?content_id=${orderItem.id}`)
      .then((response) => {
        setuserContentReactionsList(response.data)
      });
  }

  function handleRemoveReaction(userContentReactionInfo) {
    // return axios
    //   .delete(`https://artful-iudex.herokuapp.com/user_content_reactions/${userContentReactionInfo.id}`)
    //   .then(() => {
    //     setuserContentReactionsList(
    //       userContentReactionsList.filter((order) => {
    //         return order.id !== userContentReactionInfo.id;
    //       })
    //     );
    //   });
    setuserContentReactionsList(
          userContentReactionsList.filter((order) => {
            return order.id !== userContentReactionInfo.id;
          })
        );
  }
  function handleAddReaction(reactionId) {
    let data = {
      'id': userContentReactionsList.length + 1,
      'reaction_id': reactionId,
      'user_id': currentUserId,
      'content_id': orderItem.id
    }
    // return axios
    //   .post('https://artful-iudex.herokuapp.com/user_content_reactions/', data)
    //   .then((response) => {
    //     setuserContentReactionsList(...userContentReactionsList, response.data);
    //   });
    setuserContentReactionsList([...userContentReactionsList, data]);
  }
  function handleReactionClicked(reactionId) {
    let userContentReactionInfo = userContentReactions.find((orderInfo) => {
      return orderInfo.reaction_id === reactionId && orderInfo.user_id === currentUserId;
    })
    if (userContentReactionInfo) {
      handleRemoveReaction(userContentReactionInfo);
    } else {
      handleAddReaction(reactionId)
    }
  }

  // useEffect(() => {
  //   fetchUserReactions()
  // }, [])

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
      <UserReactions userContentReactionsList={userContentReactionsList} handleReactionClicked={handleReactionClicked} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    reactionsList: state.reactionsList
  };
}

export default connect(mapStateToProps)(OrderItem);

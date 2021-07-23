import { useState } from "react";
import ReactionItem from "./ReactionItem";
import EmojiChooser from "./EmojiChooser";
import ReactionSummary from "./ReactionSummary";
import Modal from "react-modal";
import { connect } from 'react-redux';

const customStyles = {
  content: {
    minWidth: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderColor: 'transparent'
  },
};

function UserReactions({ userContentReactionsList, handleReactionClicked, reactionsList, currentUserId }) {
  const [showReactionSummary, setShowReactionSummary] = useState(false);

  let reactionsCountList = [];
  reactionsList.forEach((reaction) => {
    let count = 0;
    let reactionCountInfo = { ...reaction };
    userContentReactionsList.forEach((orderItem) => {
      if (orderItem.reaction_id === reaction.id) {
        count++;
        if (orderItem.user_id === currentUserId) {
          reactionCountInfo["is_current_user_reacted"] = true;
        }
      }
    });
    if (count > 0) {
      reactionCountInfo["count"] = count;
      reactionsCountList.push(reactionCountInfo);
    }
  });

  function openReactionSummary() {
    setShowReactionSummary(true);
  }
  function closeReactionSummary() {
    setShowReactionSummary(false);
  }
  Modal.setAppElement('#main');
  return (
    <>
      <div className="flex p-3">
        {reactionsCountList.map((reactionInfo) => {
          return (
            <ReactionItem
              reactionInfo={reactionInfo}
              key={reactionInfo.id}
              openReactionSummary={openReactionSummary}
            />
          );
        })}
        <EmojiChooser handleReactionClicked={handleReactionClicked} />

        <Modal
          isOpen={showReactionSummary}
          onRequestClose={closeReactionSummary}
          style={customStyles}
          preventScroll={true}
          contentLabel="Reaction Summary"
        >
          <ReactionSummary reactionsCountList={reactionsCountList} userContentReactionsList={userContentReactionsList} />
        </Modal>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    reactionsList: state.reactionsList,
    currentUserId: state.currentUserId
  };
}

export default connect(mapStateToProps)(UserReactions);

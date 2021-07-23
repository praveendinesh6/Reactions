import { useRef } from "react";
import { useClickAway } from "react-use";
import Tooltip from './Tooltip'
import { connect } from 'react-redux';

function EmojiPopup({ closeEmojiPopup, handleReactionClicked, reactionsList }) {
  const ref = useRef(null);
  useClickAway(ref, () => {
    closeEmojiPopup();
  });
  const handleOnClick = (reactionId) => {
    closeEmojiPopup();
    handleReactionClicked(reactionId);
  };
  return (
    <div className="emoji-popup flex absolute" ref={ref}>
      {reactionsList.map((reaction) => {
        return (
          <div
            className="emoji-popup-item"
            key={reaction.id}
            onClick={() => handleOnClick(reaction.id)}
          >
            <Tooltip text={reaction.name}>
              <div role="img" className="emoji" aria-label={reaction.name}>{reaction.emoji}</div>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    reactionsList: state.reactionsList
  };
}

export default connect(mapStateToProps)(EmojiPopup);

import { useRef } from "react";
import { useClickAway } from "react-use";
import { reactionsList } from "./constants";
import Tooltip from './Tooltip'

function EmojiPopup({ closeEmojiPopup, handleReactionClicked }) {
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

export default EmojiPopup;

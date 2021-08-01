import { useRef } from "react";
import { useClickAway } from "react-use";
import Tooltip from "./Tooltip";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function EmojiPopup({ closeEmojiPopup, handleReactionClicked }) {
  const ref = useRef(null);
  const reactionsMap = useSelector((state) => state.reactionsMap);
  useClickAway(ref, () => {
    closeEmojiPopup();
  });
  const handleOnClick = (reactionId) => {
    closeEmojiPopup();
    handleReactionClicked(reactionId);
  };
  return (
    <div className="emoji-popup flex absolute" ref={ref}>
      {Object.keys(reactionsMap).map((id) => {
        let reaction = reactionsMap[id];
        return (
          <div
            className="emoji-popup-item"
            key={reaction.id}
            onClick={() => handleOnClick(reaction.id)}
          >
            <Tooltip text={reaction.name}>
              <div role="img" className="emoji" aria-label={reaction.name}>
                {reaction.emoji}
              </div>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}

EmojiPopup.propTypes = {
  closeEmojiPopup: PropTypes.func.isRequired,
  handleReactionClicked: PropTypes.func.isRequired,
};

export default EmojiPopup;

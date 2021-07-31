import { useRef } from "react";
import { useClickAway } from "react-use";
import Tooltip from "./Tooltip";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

function EmojiPopup({ closeEmojiPopup, handleReactionClicked, reactionsMap }) {
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

function mapStateToProps(state) {
  return {
    reactionsMap: state.reactionsMap,
  };
}

EmojiPopup.propTypes = {
  closeEmojiPopup: PropTypes.func.isRequired,
  handleReactionClicked: PropTypes.func.isRequired,
  reactionsMap: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(EmojiPopup);

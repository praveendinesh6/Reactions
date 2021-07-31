import { useState } from "react";
import EmojiPopup from "./EmojiPopup";
import PropTypes from 'prop-types';

function EmojiChooser({ handleReactionClicked }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEmojiPopup = () => {
    setIsOpen(true);
  };
  const closeEmojiPopup = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative">
      {isOpen && (
        <EmojiPopup
          closeEmojiPopup={closeEmojiPopup}
          handleReactionClicked={handleReactionClicked}
        />
      )}
      <div className="emoji-chooser" onClick={openEmojiPopup}>
        <img src="/svgs/emoji-chooser.svg" alt="Choose Reaction" />
      </div>
    </div>
  );
}

EmojiChooser.propTypes = {
  handleReactionClicked: PropTypes.func.isRequired
}

export default EmojiChooser;

import { useState, useRef } from "react";
import EmojiPopup from "./EmojiPopup";
import {useHoverDirty} from 'react-use';

function EmojiChooser({ handleReactionClicked }) {
  const [isOpen, setIsOpen] = useState(false);
  const hoverRef = useRef(null);
  const isHovering = useHoverDirty(hoverRef);

  const openEmojiPopup = () => {
    setIsOpen(true);
  };
  const closeEmojiPopup = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative" ref={hoverRef}>
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

export default EmojiChooser;

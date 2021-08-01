import ReactionItem from "./ReactionItem";
import EmojiChooser from "./EmojiChooser";
import ReactionSummary from "./ReactionSummary";
import { useSelector } from "react-redux";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Block } from "baseui/block";
import { useState } from "react";
import PropTypes from "prop-types";

function UserReactions({ userContentReactionsList, handleReactionClicked }) {
  const [selectedSummaryReactionId, setSelectedSummaryReactionId] = useState();

  const reactionsMap = useSelector((state) => state.reactionsMap);
  const currentUserId = useSelector((state) => state.currentUserId);

  let reactionsCountList = [];
  Object.keys(reactionsMap).forEach((reactionId) => {
    let reaction = reactionsMap[reactionId];
    let count = 0;
    let reactionCountInfo = { ...reaction };
    userContentReactionsList.forEach((orderItem) => {
      if (orderItem.reaction_id === reaction.id) {
        count++;
        if (orderItem.user_id === currentUserId) {
          reactionCountInfo["isCurrentUserReacted"] = true;
        }
      }
    });
    if (count > 0) {
      reactionCountInfo["count"] = count;
      reactionsCountList.push(reactionCountInfo);
    }
  });

  function handleReactionFocused(reactionId) {
    setSelectedSummaryReactionId(reactionId);
  }

  return (
    <>
      <div className="flex flex-wrap p-3">
        <StatefulPopover
          content={() => (
            <Block>
              <ReactionSummary
                selectedReactionId={selectedSummaryReactionId}
                reactionsCountList={reactionsCountList}
                userContentReactionsList={userContentReactionsList}
              />
            </Block>
          )}
          triggerType={TRIGGER_TYPE.hover}
          returnFocus
          autoFocus
          overrides={{
            Inner: {
              style: () => ({
                'background-color': "#fff",
                'border-radius': "4px",
              }),
            },
          }}
        >
          <Block className="flex">
            {reactionsCountList.map((reactionInfo) => {
              return (
                <ReactionItem
                  reactionInfo={reactionInfo}
                  key={reactionInfo.id}
                  handleReactionClicked={handleReactionClicked}
                  handleReactionFocused={handleReactionFocused}
                />
              );
            })}
          </Block>
        </StatefulPopover>
        <EmojiChooser handleReactionClicked={handleReactionClicked} />
      </div>
    </>
  );
}

UserReactions.propTypes = {
  userContentReactionsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content_id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
      reaction_id: PropTypes.number.isRequired,
    })
  ),
  handleReactionClicked: PropTypes.func.isRequired,
};

export default UserReactions;

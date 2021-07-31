import ReactionItem from "./ReactionItem";
import EmojiChooser from "./EmojiChooser";
import ReactionSummary from "./ReactionSummary";
import { connect } from "react-redux";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Block } from "baseui/block";
import { useState } from "react";

function UserReactions({
  userContentReactionsList,
  handleReactionClicked,
  reactionsList,
  currentUserId,
}) {
  const [selectedSummaryReactionId, setSelectedSummaryReactionId] = useState();

  let reactionsCountList = [];
  reactionsList.forEach((reaction) => {
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
                backgroundColor: "#fff",
                borderRadius: "4px",
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

function mapStateToProps(state) {
  return {
    reactionsList: state.reactionsList,
    currentUserId: state.currentUserId,
  };
}

export default connect(mapStateToProps)(UserReactions);

import ReactionItem from "./ReactionItem";
import EmojiChooser from "./EmojiChooser";
import ReactionSummary from "./ReactionSummary";
import { connect } from "react-redux";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Block } from "baseui/block";

function UserReactions({
  userContentReactionsList,
  handleReactionClicked,
  reactionsList,
  currentUserId,
}) {
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

  return (
    <>
      <div className="flex flex-wrap p-3">
        {reactionsCountList.map((reactionInfo, index) => {
          return (
            <StatefulPopover
              key={reactionInfo.id}
              content={() => (
                <Block>
                  <ReactionSummary
                    key={reactionInfo.id}
                    defaultIndex={index + 1}
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
                    "background-color": "#fff",
                    "border-radius": "4px",
                  }),
                },
              }}
            >
              <Block>
                <ReactionItem
                  reactionInfo={reactionInfo}
                  key={reactionInfo.id}
                  handleReactionClicked={handleReactionClicked}
                />
              </Block>
            </StatefulPopover>
          );
        })}
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

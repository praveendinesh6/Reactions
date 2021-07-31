import ReactionItem from "./ReactionItem";
import EmojiChooser from "./EmojiChooser";
import ReactionSummary from "./ReactionSummary";
import { connect } from "react-redux";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Block } from "baseui/block";
import { useState } from "react";
import PropTypes from 'prop-types';

function UserReactions({
  userContentReactionsList,
  handleReactionClicked,
  reactionsMap,
  currentUserId,
}) {
  const [selectedSummaryReactionId, setSelectedSummaryReactionId] = useState();

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
    reactionsMap: state.reactionsMap,
    currentUserId: state.currentUserId,
  };
}

UserReactions.propTypes = {
  userContentReactionsList: PropTypes.array.isRequired,
  handleReactionClicked: PropTypes.func.isRequired,
  reactionsMap: PropTypes.object.isRequired,
  currentUserId: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(UserReactions);

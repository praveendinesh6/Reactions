import { usersList, reactionsList, currentUserId } from "./constants";
import ReactionItem from "./ReactionItem";
import EmojiChooser from "./EmojiChooser";

function UserReactions({ reactions, handleReactionClicked }) {
  let reactionsCountList = [];
  reactionsList.forEach((reaction) => {
    let count = 0;
    let reactionCountInfo = { ...reaction };
    reactions.forEach((orderItem) => {
      if (orderItem.reaction_id === reaction.id) {
        count++;
        if (orderItem.user_id === currentUserId) {
          reactionCountInfo["is_current_user_reacted"] = true;
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
    <div className="flex p-3">
        {reactionsCountList.map((reactionInfo) => {
          return <ReactionItem reactionInfo={reactionInfo} key={reactionInfo.id} />;
     })}
     <EmojiChooser handleReactionClicked={handleReactionClicked} />
     </div>
    </>
  );
}

export default UserReactions;

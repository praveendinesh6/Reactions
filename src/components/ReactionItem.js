function ReactionItem({ reactionInfo, openReactionSummary, handleReactionClicked }) {
 const onClick = () => {
  if (reactionInfo.isCurrentUserReacted) {
    handleReactionClicked(reactionInfo.id)
  }
 }

 return (
  <div className={`user-reaction-item ${reactionInfo.isCurrentUserReacted ? "user-reacted" : ''}`} onClick={onClick}>
   <span role="img" className="emoji p-2" aria-label={reactionInfo.name}>{reactionInfo.emoji}</span>
   <span>{reactionInfo.count}</span>
  </div>
 )
}

export default ReactionItem;
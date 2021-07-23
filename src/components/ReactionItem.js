function ReactionItem({ reactionInfo, openReactionSummary }) {
 return (
  <div className={`user-reaction-item ${reactionInfo.is_current_user_reacted ? "user-reacted" : ''}`} onClick={openReactionSummary}>
   <span role="img" className="emoji p-2" aria-label={reactionInfo.name}>{reactionInfo.emoji}</span>
   <span>{reactionInfo.count}</span>
  </div>
 )
}

export default ReactionItem;
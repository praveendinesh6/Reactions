function ReactionItem({ reactionInfo }) {
 return (
  <div className={`user-reaction-item ${reactionInfo.is_current_user_reacted ? "user-reacted" : ''}`}>
   <span role="img" className="emoji p-2" aria-label={reactionInfo.name}>{reactionInfo.emoji}</span>
   <span>{reactionInfo.count}</span>
  </div>
 )
}

export default ReactionItem;
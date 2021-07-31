import PropTypes from 'prop-types';

function ReactionItem({ reactionInfo, handleReactionClicked, handleReactionFocused }) {
 
  const onClick = () => {
    handleReactionClicked(reactionInfo.id)
 }

 return (
   <div className={`user-reaction-item ${reactionInfo.isCurrentUserReacted ? "user-reacted" : ''}`}
     onClick={onClick} onMouseOver={() => { handleReactionFocused(reactionInfo.id) }}>
   <span role="img" className="emoji p-2" aria-label={reactionInfo.name}>{reactionInfo.emoji}</span>
   <span>{reactionInfo.count}</span>
  </div>
 )
}

ReactionItem.propTypes = {
  reactionInfo: PropTypes.object.isRequired,
  handleReactionClicked: PropTypes.func.isRequired,
  handleReactionFocused: PropTypes.func.isRequired
}

export default ReactionItem;
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

function ReactionSummaryContent({ reactionId = '', userContentReactionsList }) {
  const reactionsMap = useSelector((state) => state.reactionsMap)
  const usersMap = useSelector((state) => state.usersMap)
  let userReactionList = []

  userContentReactionsList.forEach((reactionInfo) => {
    if (reactionId) {
      if (reactionInfo.reaction_id === reactionId) {
        userReactionList.push({
          'user_id': reactionInfo.user_id,
          'reaction_id': reactionId
        })
      }
    } else {
      userReactionList.push({
        'user_id': reactionInfo.user_id,
        'reaction_id': reactionInfo.reaction_id
      })
    }
  });

  return (
      <div>
      {userReactionList.map((reactionInfo) => {
        const userInfo = usersMap[reactionInfo.user_id];
        const reaction = reactionsMap[reactionInfo.reaction_id];
        return <div className="reaction-summary-content-row flex px-4 py-2 items-center" key={userInfo.user_id}>
          <img className="user-image rounded-full mr-3" src={userInfo.avatar} alt={userInfo.first_name} />
          <div role="img" className="emoji pr-3" aria-label={reaction.name}>{reaction.emoji}</div>
          <div className="font-medium">
          <span className="pr-1">{userInfo.first_name}</span>
          {userInfo.last_name}</div>
        </div>
      })}
      </div>
    )
}

ReactionSummaryContent.propTypes = {
  reactionId: PropTypes.number.isRequired,
  userContentReactionsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content_id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
      reaction_id: PropTypes.number.isRequired,
    })
  ),
}

export default (ReactionSummaryContent);
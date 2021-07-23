import { connect } from 'react-redux';

function ReactionSummaryContent({ reactionId = '', userContentReactionsList, usersMap, reactionsMap }) {
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
        return <div className="flex px-4 py-2 items-center">
          <img className="user-image rounded-full mr-3" src={usersMap[reactionInfo.user_id].avatar} alt={usersMap[reactionInfo.user_id].first_name} />
          <div role="img" className="emoji pr-3" aria-label={reactionsMap[reactionInfo.reaction_id].name}>{reactionsMap[reactionInfo.reaction_id].emoji}</div>
          <div className="font-medium">
          <span className="pr-1">{usersMap[reactionInfo.user_id].first_name}</span>
          {usersMap[reactionInfo.user_id].last_name}</div>
        </div>
      })}
      </div>
    )
}

function mapStateToProps(state) {
  return {
    usersMap: state.usersMap,
    reactionsMap: state.reactionsMap
  };
}

export default connect(mapStateToProps)(ReactionSummaryContent);
function storeUsersLists(payload) {
  return { type: 'FETCH_USERS_LIST', payload: payload }
}
function storeReactionsList(payload) {
  return { type: 'FETCH_REACTIONS_LIST', payload: payload }
}

export { storeUsersLists, storeReactionsList }
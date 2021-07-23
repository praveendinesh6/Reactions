import './App.css';
import {useEffect} from 'react'
import store from './store'
import Orders from './components/Orders'
import axios from "axios";
import { storeUsersLists, storeReactionsList } from './actions'

const fetchOrgInfo = () => async dispatch => {
  try {
      let userResponse = await axios.get('https://artful-iudex.herokuapp.com/users')
      dispatch(storeUsersLists(userResponse.data))
      let reactionResponse = await axios.get('https://artful-iudex.herokuapp.com/reactions')
      dispatch(storeReactionsList(reactionResponse.data))
    } catch (err) {}
  }

function App() {

  useEffect(() => {
    store.dispatch(fetchOrgInfo())
  }, [])

  return (
    <div className="overscroll-y-none" id="main">
      <Orders />
    </div>
  );
}

export default App;

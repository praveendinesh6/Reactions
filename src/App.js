import "./App.css";
import { useEffect } from "react";
import Orders from "./pages/Orders";
import { ReactionsAPI } from "./api/reactions";
import { UsersAPI } from "./api/users";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import {useDispatch} from 'react-redux'

import { storeUsersLists, storeReactionsList } from "./actions";

const engine = new Styletron();

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchOrgInfo = async () => {
      try {
        let userResponse = await UsersAPI.fetchUsers();
        dispatch(storeUsersLists(userResponse));
        let reactionResponse = await ReactionsAPI.fetchReactions();
        dispatch(storeReactionsList(reactionResponse));
      } catch (err) {}
    };
    fetchOrgInfo()
  }, [dispatch]);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="overscroll-y-none" id="main">
          <Orders />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;

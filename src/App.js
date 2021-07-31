import "./App.css";
import { useEffect } from "react";
import store from "./store";
import Orders from "./demo/Orders";
import { fetchReactions } from "./api/reactions";
import { fetchUsers } from "./api/users";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

import { storeUsersLists, storeReactionsList } from "./actions";

const engine = new Styletron();

const fetchOrgInfo = () => async (dispatch) => {
  try {
    let userResponse = await fetchUsers();
    dispatch(storeUsersLists(userResponse));
    let reactionResponse = await fetchReactions();
    dispatch(storeReactionsList(reactionResponse));
  } catch (err) {}
};

function App() {
  useEffect(() => {
    store.dispatch(fetchOrgInfo());
  }, []);

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

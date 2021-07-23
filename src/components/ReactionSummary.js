import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactionSummaryContent from "./ReactionSummaryContent";
import "react-tabs/style/react-tabs.css";

function ReactionSummary({ reactionsCountList, userContentReactionsList }) {
  return (
    <div>
      <div className="font-semibold pl-5 pt-5">Reactions</div>
      <Tabs selectedTabClassName="reaction-summary-tab-selected">
        <TabList className="flex reaction-summary-tablist items-center">
          <Tab className="flex reaction-summary-tab items-center reaction-summary-all">
            All
          </Tab>
          {reactionsCountList.map((reaction) => {
            return (
              <Tab className="flex reaction-summary-tab items-center">
                <div
                  role="img"
                  className="emoji p-2 pr-3"
                  aria-label={reaction.name}
                >
                  {reaction.emoji}
                </div>
                <div className="round-bubble"></div>
                <div className="pl-2">{reaction.count}</div>
              </Tab>
            );
          })}
        </TabList>
        <TabPanel>
          <ReactionSummaryContent
            reactionId=""
            userContentReactionsList={userContentReactionsList}
          />
        </TabPanel>
        {reactionsCountList.map((reaction) => {
          return (
            <TabPanel>
                <ReactionSummaryContent
                  reactionId={reaction.id}
                  userContentReactionsList={userContentReactionsList}
                />
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
}

export default ReactionSummary;

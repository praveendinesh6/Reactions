import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import ReactionSummaryContent from "./ReactionSummaryContent";
import "react-tabs/style/react-tabs.css";
import PropTypes from 'prop-types';

function ReactionSummary({
  reactionsCountList,
  userContentReactionsList,
  selectedReactionId,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let reactionIndex = reactionsCountList.findIndex((reaction) => {
      return reaction.id === selectedReactionId;
    });
    setSelectedIndex(reactionIndex + 1);
  }, [selectedReactionId, reactionsCountList]);

  return (
    <div className="reaction-summary">
      <div className="reaction-summary-header font-semibold pt-5">
        Reactions
      </div>
      <Tabs
        selectedTabClassName="reaction-summary-tab-selected"
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList className="grid eaction-summary-tablist items-center justify-items-stretch grid-flow-col">
          <Tab className="flex reaction-summary-tab items-center reaction-summary-all">
            All
          </Tab>
          {reactionsCountList.map((reaction) => {
            return (
              <Tab className="flex reaction-summary-tab items-center" key={reaction.id}>
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
            <TabPanel key={reaction.id}>
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

ReactionSummary.propTypes = {
  reactionsCountList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
    })
  ),
  userContentReactionsList: PropTypes.array.isRequired,
  selectedReactionId: PropTypes.number.isRequired
}

export default ReactionSummary;

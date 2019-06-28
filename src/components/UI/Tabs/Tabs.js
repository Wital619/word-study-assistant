import React from 'react';

import classes from './Tabs.css';

const Tabs = props => {
  return (
    <ul className={classes.SelectionMethods}>
      {props.tabs.map(tabName => (
        <li
          key={tabName}
          style={{
            background:
              tabName === props.activeTab ? 'green' : 'transparent'
          }}
          className={classes.SelectionMethod}
          onClick={() => props.onChangeTab(tabName)}
        >
          {tabName}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;

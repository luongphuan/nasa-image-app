import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from '@components/Tab';
import './styles.less';

const Tabs = (props) => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);
  const onClickTabItem = label => {
    setActiveTab(label);
  }
  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClickTabItem={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child, index) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.array
}

Tabs.defaultProps = {
  children: []
}

export default Tabs;

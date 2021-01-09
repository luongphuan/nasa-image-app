import React from 'react';

const Tab = (props) => {
    const { label, onClickTabItem } = props;
    const onClick = () => {
        onClickTabItem(label);
    }
    var tabClassName = "tab-item";
    if (props.activeTab === label) {
        tabClassName += " tab-item-active";
    }
    return (
        <li className={tabClassName} onClick={onClick}>{label}</li>
    );
}
export default Tab;
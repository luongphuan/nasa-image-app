import React from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const Spinner = (props) => {
  const { isLoading } = props;
  const renderElement = isLoading ?
    <div className="spinner-wrapper">
      <div className="spinner-container">
        {props.children}
      </div>
      <div className="spinner-overlay">
      </div>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" stroke="#afdfdb" strokeWidth="5"></circle>
      </svg>
    </div>
    : props.children;
  return (
    <>
      { renderElement}
    </>
  );
}

Spinner.propTypes = {
  isLoading: PropTypes.bool
}

Spinner.defaultProps = {
  isLoading: false
}

export default Spinner;

import React from 'react';
import PropTypes from 'prop-types';
import './styles.less';
import SearchIcon from '@assets/icons/search-icon.svg';

const Search = (props) => {
  const { onChange, onClick } = props;

  const onInputChange = (event) => {
    onChange(event.target.value);
  }

  const onSearch = () => {
    onClick();
  }

  return (
    <div className="search-wrapper">
      <input onChange={onInputChange} name="text" type="text" placeholder="Search image" />
      <span onClick={onSearch} className="search-icon"><img src={SearchIcon}></img></span>
    </div>
  );
}

Search.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

Search.defaultProps = {
  onChange: () => { },
  onClick: () => { },
}

export default Search;

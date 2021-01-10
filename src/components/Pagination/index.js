import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const Pagination = (props) => {
  const { total, onClickPage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  var arr = [];

  const handleClick = (event) => {
    const index = parseInt(event.target.getAttribute('item-index'));
    setCurrentPage(index);
    onClickPage(index)
  }

  const handleClickPrevious = () => {
    if (currentPage > 2) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleClickNext = () => {
    if (currentPage < arr.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const items = () => {
    for (let index = 1; index <= total; index++) {
      arr.push(index);
    }
    if (arr.length > 0) {
      if (currentPage <= 4) {
        return <>
          <li onClick={handleClickPrevious}>{"<"}</li>
          {arr.map(item => {
            if (item < 6) {
              return <li
                key={item}
                className={currentPage === item ? "active" : ""}
                item-index={item}
                onClick={handleClick}
              >
                {item}
              </li>
            }
            if (item === 6) {
              return <li key={item} item-index={item} onClick={handleClick}>...</li>
            }
          })}
          <li
            item-index={arr[arr.length - 1]}
            onClick={handleClick}
          >
            {arr[arr.length - 1]}
          </li>
          <li onClick={handleClickNext}>{">"}</li>
        </>
      }
      if (currentPage > arr.length - 4) {
        return <>
          <li onClick={handleClickPrevious}>{"<"}</li>
          <li
            item-index={arr[0]}
            onClick={handleClick}
          >
            {arr[0]}
          </li>
          {arr.map(item => {
            if (item > arr.length - 5) {
              return <li
                key={item}
                className={currentPage === item ? "active" : ""}
                item-index={item}
                onClick={handleClick}
              >
                {item}
              </li>
            }
            if (item === arr.length - 5) {
              return <li item-index={item} onClick={handleClick}>...</li>
            }
          })}
          <li onClick={handleClickNext}>{">"}</li>
        </>
      } else {
        return <>
          <li onClick={handleClickPrevious}>{"<"}</li>
          <li
            item-index={arr[0]}
            onClick={handleClick}
          >
            {arr[0]}
          </li>
          <li
            item-index={currentPage - 2}
            onClick={handleClick}
          >
            ...
          </li>
          {arr.map(item => {
            if (item >= currentPage - 1 && item <= currentPage + 1) {
              return <li
                key={item}
                item-index={item}
                className={currentPage === item ? "active" : ""}
                onClick={handleClick}
              >
                {item}
              </li>
            }
          })}
          <li
            item-index={currentPage + 2}
            onClick={handleClick}
          >
            ...
          </li>

          <li
            item-index={arr[arr.length - 1]}
            onClick={handleClick}
          >
            {arr[arr.length - 1]}
          </li>
          <li onClick={handleClickNext}>{">"}</li>
        </>
      }
    }
  }

  return (
    <ul className="pagination-wrapper">
      {items()}
    </ul>
  );
}

Pagination.propTypes = {
  total: PropTypes.number,
  onClickPage: PropTypes.func
}

Pagination.defaultProps = {
  total: 0,
  onClickPage: () => { }
}

export default Pagination;

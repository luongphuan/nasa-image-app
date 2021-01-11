import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.less';
import Pagination from '@components/Pagination';

const Table = (props) => {
  const {
    data,
    columns,
    limit,
    onHandleEdit,
    onHandleRemove,
    onHandleLike
  } = props;
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(data.slice(0, limit));
  useEffect(() => {
    setCurrentData(data.slice((currentPage - 1) * limit, currentPage * limit - 1));
  }, [data]);
  const onEdit = (event) => {
    if (event.target.innerText === "Edit") {
      if (editingRowIndex === -1) {
        const index = parseInt(event.target.parentNode.parentNode.getAttribute('row-index'));
        setEditingRowIndex(index);
      }
    } else {
      const nodeList = event.target.parentNode.parentNode.childNodes;
      const submitObject = Array.from(nodeList, node => {
        if (node.childNodes[0]) {
          if (node.childNodes[0].nodeName === "INPUT") {
            return node.childNodes[0].value
          }
          return node.childNodes[0].innerText;
        }
      });
      onHandleEdit(submitObject);
      setEditingRowIndex(-1);
    }
  }

  const onPagination = (page) => {
    setCurrentPage(page);
    if (page > 0) {
      setCurrentData(data.slice((page - 1) * limit, page * limit - 1));
    }
  }

  const onLike = (event) => {
    const id = event.target.parentNode.parentNode.childNodes[1].innerText;
    onHandleLike(id);
  }

  const onRemove = (event) => {
    const id = event.target.parentNode.parentNode.childNodes[1].innerText;
    onHandleRemove(id);
  }

  const renderCols = (record, rowIndex) => {
    const cols = columns.map((col, index) => {
      if (col.key === "action") {
        return <td style={{ width: col.width }} className="action-cell" key={index}>
          {!record.removed ?
            <label onClick={onLike} className="action-button">
              {record.liked ? "Dislike" : "Like"}
            </label> : <></>
          }
          <label onClick={onRemove} className="action-button">{record.removed ? "Undo" : "Remove"}</label>
          {!record.removed ?
            <label
              onClick={onEdit}
              className="action-button">
              {rowIndex === editingRowIndex ? "Save" : "Edit"}
            </label> : <></>
          }
        </td>
      }
      if (col.key === "no") {
        return <td style={{ width: col.width }} className="action-cell" key={index}>
          {record.recordIndex + 1}
        </td>
      }
      if (rowIndex === editingRowIndex) {
        return <td style={{ width: col.width }} key={index}>
          {rowIndex === editingRowIndex &&
            index !== 0 && index !== 1 && index !== columns.length - 1 ?
            <input defaultValue={record[col.key]} className="cell-input"></input> : <label>{record[col.key]}</label>
          }
        </td>
      }
      return <td style={{ width: col.width }} key={index}>{record[col.key]}</td>
    })
    return cols;
  }

  const renderBody = currentData.length > 0 && currentData.map((record, index) => {
    return <tr row-index={index} className="table-row" key={index}>{renderCols(record, index)}</tr>
  })

  const renderHead = columns.map((col, index) => {
    return <th className="table-cell" key={index} style={{ width: col.width }}>{col.label}</th>
  })

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr className="table-header">{renderHead}</tr>
        </thead>
        <tbody>
          {renderBody}
        </tbody>
      </table>
      <Pagination total={data.length} limit={limit} onClickPage={onPagination} />
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  limit: PropTypes.number,
  onHandleEdit: PropTypes.func,
  onHandleRemove: PropTypes.func,
  onHandleLike: PropTypes.func
}

Table.defaultProps = {
  data: [],
  columns: [],
  limit: 10,
  onHandleEdit: () => { },
  onHandleRemove: () => { },
  onHandleLike: () => { }
}

export default Table;

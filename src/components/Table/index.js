import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.less';
import Pagination from '@components/Pagination';

const Table = (props) => {
  const { data, columns, totalRecord, onHandleEdit } = props;
  const rows = data;
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [likedRowIndex, setLikedRowIndex] = useState(-1);

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
          if(node.childNodes[0].nodeName === "INPUT"){
            return node.childNodes[0].value
          }
          return node.childNodes[0].innerText;
        }
      });
      onHandleEdit(submitObject);
      setEditingRowIndex(-1);
    }
  }

  const onHandleLike = (event) => {
    if (likedRowIndex === -1) {
      const index = parseInt(event.target.parentNode.parentNode.getAttribute('row-index'));
      setLikedRowIndex(index);
    } else {
      setLikedRowIndex(-1);
    }
  }

  const renderCols = (record, rowIndex) => {
    const cols = columns.map((col, index) => {
      if (col.key === "action") {
        return <td style={{ width: col.width }} className="action-cell" key={index}>
          <label onClick={onHandleLike} className="action-button">
            {rowIndex === likedRowIndex ? "Like" : "Dislike"}
          </label>
          <label className="action-button">Remove</label>
          <label
            onClick={onEdit}
            className="action-button">
            {rowIndex === editingRowIndex ? "Save" : "Edit"}
          </label>
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
            index !== 0 && index !== 1 && index !== columns.length-1?
            <input defaultValue={record[col.key]}></input> : <label>{record[col.key]}</label>
          }
        </td>
      }
      return <td style={{ width: col.width }} key={index}>{record[col.key]}</td>
    })
    return cols;
  }

  const renderBody = rows.length > 0 && rows.map((record, index) => {
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
      <Pagination total={totalRecord} />
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
}

Table.defaultProps = {
  data: [],
  columns: []
}

export default Table;

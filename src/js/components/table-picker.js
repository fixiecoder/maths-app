import React from 'react';
import checkboxCheckedImageSrc from '../../assets/checkbox_checked.svg';
import checkboxUncheckedImageSrc from '../../assets/checkbox_unchecked.svg';

export default function TablePicker(props) {
  const tables = props.tables
    .toList()
    .sort((a, b) => (a.get('value') - b.get('value')))
    .map(table =>
      (
        <div key={table.get('value')} className="table-picker-table-wrapper">
          <label className="table-picker-table-label">
            <span className="table-picker-table-label-text">{table.get('value')}</span>
            <img
              alt=""
              className="table-picker-table-label-input"
              src={table.get('included') ? checkboxCheckedImageSrc : checkboxUncheckedImageSrc}
            />
            <input
              hidden={true}
              type='checkbox'
              checked={table.get('included')}
              onChange={(e) => props.setTable(table.get('key'), e.target.checked) }
            />
          </label>
        </div>
      )
    );
  const style = {
    height: props.show ? 200 : 0
  };
  return (
    <div className="table-picker-wrapper" style={style}>
      <h2>Which tables do you want to include?</h2>
      <div className="table-picker-inner">
        {tables}
      </div>
    </div>
  );
}

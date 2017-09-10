import React from 'react';

export default function Spinner() {
  return (
    <div className="lds-css ng-scope">
      <div className="lds-spinner" style={{ height: '100%', width: '100%' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

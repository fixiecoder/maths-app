import React from 'react';

export default function Modal(props) {
  return (
    <div className="modal-wrapper">
      <div className="modal-inner">
        <h3>Are you sure you want to logout?</h3>
        <div className="modal-buttons">
          <button className="modal-yes" onClick={props.logout}>Yes</button>
          <button className="modal-no" onClick={() => props.setShowModal(false)}>No</button>
        </div>
      </div>
    </div>
  );
}

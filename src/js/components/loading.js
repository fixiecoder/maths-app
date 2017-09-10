import React from 'react';
import spinnerSrc from '../../assets/Spinner.svg';

export default function Loading() {
  return (
    <div className="loading-screen">
      <img className="loading-spinner" src={spinnerSrc} alt=""/>
      <h3 className="loading-text">Loading</h3>
    </div>
  );
}

import React from 'react';
import checkboxCheckedImageSrc from '../../assets/checkbox_checked.svg';
import checkboxUncheckedImageSrc from '../../assets/checkbox_unchecked.svg';
import { MULTIPLY, PLUS, MINUS, methodSymbols } from '../constants/methods';

export default function MethodPicker(props) {

  return (
    <div className="methods-picker-wrapper">
      <div className="methods-picker-inner">
        <label className="methods-picker-label">
          <span className="methods-picker-label-text">{methodSymbols[MULTIPLY]}</span>
          <img
            alt=""
            className="method-picker-label-input"
            src={props.methods.getIn([MULTIPLY, 'included']) ? checkboxCheckedImageSrc : checkboxUncheckedImageSrc}
          />
          <input
            hidden={true}
            type='checkbox'
            checked={props.methods.getIn([MULTIPLY, 'included'])}
            onChange={() => props.setMethod(MULTIPLY, !props.methods.getIn([MULTIPLY, 'included'])) }
          />
        </label>
        <label className="methods-picker-label">
          <span className="methods-picker-label-text">{methodSymbols[PLUS]}</span>
          <img
            alt=""
            className="method-picker-label-input"
            src={props.methods.getIn([PLUS, 'included']) ? checkboxCheckedImageSrc : checkboxUncheckedImageSrc}
          />
          <input
            hidden={true}
            type='checkbox'
            checked={props.methods.getIn([PLUS, 'included'])}
            onChange={() => props.setMethod(PLUS, !props.methods.getIn([PLUS, 'included'])) }
          />
        </label>
        <label className="methods-picker-label">
          <span className="methods-picker-label-text">{methodSymbols[MINUS]}</span>
          <img
            alt=""
            className="method-picker-label-input"
            src={props.methods.getIn([MINUS, 'included']) ? checkboxCheckedImageSrc : checkboxUncheckedImageSrc}
          />
          <input
            hidden={true}
            type='checkbox'
            checked={props.methods.getIn([MINUS, 'included'])}
            onChange={() => props.setMethod(MINUS, !props.methods.getIn([MINUS, 'included'])) }
          />
        </label>
      </div>
    </div>
  );
}

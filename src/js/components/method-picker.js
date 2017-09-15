import React from 'react';
import checkboxCheckedImageSrc from '../../assets/checkbox_checked.svg';
import checkboxUncheckedImageSrc from '../../assets/checkbox_unchecked.svg';
import { MULTIPLY, ADD, SUBTRACT, methodSymbols } from '../constants/methods';

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
          <span className="methods-picker-label-text">{methodSymbols[ADD]}</span>
          <img
            alt=""
            className="method-picker-label-input"
            src={props.methods.getIn([ADD, 'included']) ? checkboxCheckedImageSrc : checkboxUncheckedImageSrc}
          />
          <input
            hidden={true}
            type='checkbox'
            checked={props.methods.getIn([ADD, 'included'])}
            onChange={() => props.setMethod(ADD, !props.methods.getIn([ADD, 'included'])) }
          />
        </label>
        <label className="methods-picker-label">
          <span className="methods-picker-label-text">{methodSymbols[SUBTRACT]}</span>
          <img
            alt=""
            className="method-picker-label-input"
            src={props.methods.getIn([SUBTRACT, 'included']) ? checkboxCheckedImageSrc : checkboxUncheckedImageSrc}
          />
          <input
            hidden={true}
            type='checkbox'
            checked={props.methods.getIn([SUBTRACT, 'included'])}
            onChange={() => props.setMethod(SUBTRACT, !props.methods.getIn([SUBTRACT, 'included'])) }
          />
        </label>
      </div>
    </div>
  );
}

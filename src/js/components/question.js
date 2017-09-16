import React from 'react';
import { FORMAT1, FORMAT2, FORMAT3 } from '../constants/question-formats';
import ThreePartEquation from '../containers/question-types/three-part-equation';
import NumberStructure from '../containers/question-types/number-structure';

export default function Question(props) {
  switch(props.question.get('method')) {
    default:
      return <ThreePartEquation />;
  }
}

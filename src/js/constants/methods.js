import { THREE_PART_EQUATION, NUMBER_STRUCTURE } from '../constants/question-types';

export const MULTIPLY = 'MULTIPLY';
export const DIVIDE = 'DIVIDE';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const ALL = 'ALL';

export const methodsList = [
  MULTIPLY,
  DIVIDE,
  ADD,
  SUBTRACT,
  ALL
];

export const methodSymbols = {
  MULTIPLY: 'x',
  DIVIDE: '/',
  ADD: '+',
  SUBTRACT: '-',
};

export const methodsQuestionTypeMap = {
  MULTIPLY: THREE_PART_EQUATION,
  DIVIDE: THREE_PART_EQUATION,
  ADD: THREE_PART_EQUATION,
  SUBTRACT: THREE_PART_EQUATION,
};

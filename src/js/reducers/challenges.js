import { Map, List } from 'immutable';
import * as actionTypes from '../actions/types/challenge';

const initialState = Map({
  '2-times-table-easy': Map({
    order: 0,
    questionCount: 4,
    name: 'Two times table easy',
    challengeId: '2-times-table-easy',
    includedTables: List(['two']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '3-times-table-easy': Map({
    order: 1,
    questionCount: 10,
    name: 'Three times table easy',
    challengeId: '3-times-table-easy',
    includedTables: List(['three']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '4-times-table-easy': Map({
    order: 2,
    questionCount: 10,
    name: 'Four times table easy',
    challengeId: '4-times-table-easy',
    includedTables: List(['four']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '5-times-table-easy': Map({
    order: 3,
    questionCount: 10,
    name: 'Five times table easy',
    challengeId: '5-times-table-easy',
    includedTables: List(['five']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '6-times-table-easy': Map({
    order: 4,
    questionCount: 10,
    name: 'Six times table easy',
    challengeId: '6-times-table-easy',
    includedTables: List(['six']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '7-times-table-easy': Map({
    order: 5,
    questionCount: 10,
    name: 'Seven times table easy',
    challengeId: '7-times-table-easy',
    includedTables: List(['seven']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '8-times-table-easy': Map({
    order: 6,
    questionCount: 10,
    name: 'Eight times table easy',
    challengeId: '8-times-table-easy',
    includedTables: List(['eight']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '9-times-table-easy': Map({
    order: 7,
    questionCount: 10,
    name: 'Nine times table easy',
    challengeId: '9-times-table-easy',
    includedTables: List(['nine']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  '10-times-table-easy': Map({
    order: 8,
    questionCount: 10,
    name: 'Ten times table easy',
    challengeId: '10-times-table-easy',
    includedTables: List(['ten']),
    methods: List(['MULTIPLY']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  'easy-adding': Map({
    order: 9,
    questionCount: 10,
    name: 'Basic addition',
    challengeId: 'easy-adding',
    includedTables: List(),
    methods: List(['PLUS']),
    difficulty: 'EASY',
    history: List(),
    trophy: null,
  }),
  'medium-adding': Map({
    order: 10,
    questionCount: 10,
    name: 'Medium addition',
    challengeId: 'medium-adding',
    includedTables: List(),
    methods: List(['PLUS']),
    difficulty: 'MEDUIUM',
    history: List(),
    trophy: null,
  }),
  'hard-adding': Map({
    order: 11,
    questionCount: 10,
    name: 'Hard addition',
    challengeId: 'hard-adding',
    includedTables: List(),
    methods: List(['PLUS']),
    difficulty: 'HARD',
    history: List(),
    trophy: null,
  })
});

export default function challenges(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_ALL_CHALLENGES:
      return action.challenges;

    case actionTypes.SET_CHALLENGE_TROPHY:
      return state.setIn([action.challengeId, 'trophy'], action.trophy);

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

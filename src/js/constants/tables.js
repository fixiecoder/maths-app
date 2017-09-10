import { Map, Range } from 'immutable';

export const tableMap = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

export const tableList = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

export const TABLES = Map({
  one: Map({
    key: 'one',
    included: false,
    value: 1,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  two: Map({
    key: 'two',
    included: true,
    value: 2,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  three: Map({
    key: 'three',
    included: false,
    value: 3,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  four: Map({
    key: 'four',
    included: false,
    value: 4,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  five: Map({
    key: 'five',
    included: false,
    value: 5,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  six: Map({
    key: 'six',
    included: false,
    value: 6,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  seven: Map({
    key: 'seven',
    included: false,
    value: 7,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  eight: Map({
    key: 'eight',
    included: false,
    value: 8,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  nine: Map({
    key: 'nine',
    included: false,
    value: 9,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
  ten: Map({
    key: 'ten',
    included: false,
    value: 10,
    factors: Map({
      qV1: Range(1, 11).toList(),
      qV2: Range(1, 11).toList(),
    }),
  }),
});

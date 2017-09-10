import React from 'react';
import { Map } from 'immutable';
import TablePicker from '../containers/table-picker';
import DifficultyPicker from '../containers/difficulty-picker';
import MethodPicker from '../containers/method-picker';
import { PRACTICE_MENU } from '../constants/pages';
import { MULTIPLY, PLUS, MINUS } from '../constants/methods';

export default class Practices extends React.PureComponent {
  constructor(props) {
    super(props);
    this.startPractice = this.startPractice.bind(this);
    this.setMethod = this.setMethod.bind(this);
    this.setTable = this.setTable.bind(this);
    this.state = {
      methods: Map({
        MULTIPLY: Map({ included: false, method: MULTIPLY }),
        PLUS: Map({ included: false, method: PLUS }),
        MINUS: Map({ included: false, method: MINUS }),
      }),
      tables: Map({
        one: Map({ included: false, value: 1, key: 'one' }),
        two: Map({ included: false, value: 2, key: 'two' }),
        three: Map({ included: false, value: 3, key: 'three' }),
        four: Map({ included: false, value: 4, key: 'four' }),
        five: Map({ included: false, value: 5, key: 'five' }),
        six: Map({ included: false, value: 6, key: 'six' }),
        seven: Map({ included: false, value: 7, key: 'seven' }),
        eight: Map({ included: false, value: 8, key: 'eight' }),
        nine: Map({ included: false, value: 9, key: 'nine' }),
        ten: Map({ included: false, value: 10, key: 'ten' }),
      })
    };
  }

  startPractice() {
    this.props.initPractice('EASY', this.state.methods, this.state.tables);
  }

  componentDidMount() {
    this.props.setCurrentPage(PRACTICE_MENU);
  }

  setMethod(key, included) {
    const tables = this.state.methods.setIn([key, 'included'], included);
    this.setState({ methods: tables });
  }
  setTable(key, included) {
    const tables = this.state.tables.setIn([key, 'included'], included);
    this.setState({ tables });
  }

  render() {
    const disable = !this.state.methods.reduce((res, method) =>
      res || method.get('included'), false
    );

    const disabledClass = disable ? 'disabled' : '';
    return (
      <div className="practice-menu-wrapper">
       <h2 className="practice-menu-heading">Choose what you want to practice</h2>
       <DifficultyPicker />
        <MethodPicker methods={this.state.methods} setMethod={this.setMethod} />
        <TablePicker
          show={this.state.methods.getIn([MULTIPLY, 'included'])}
          tables={this.state.tables} setTable={this.setTable}
        />
        <div className="menu-play-buttons">
          <button
            disabled={disable}
            onClick={this.startPractice}
            className={`menu-play-button ${disabledClass}`}
          >
            START
          </button>
        </div>
      </div>
    );
  }
}

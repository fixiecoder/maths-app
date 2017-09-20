import React from 'react';
import randomColor from 'randomcolor';
import { LEARN } from '../constants/pages';
function invertColor(hexTripletColor) {
    const colorInt = parseInt(hexTripletColor.substring(1), 16);
    const midpoint = 16777215 / 2;
    return colorInt > midpoint ? '#000000' : '#ffffff';
}
export default class Learn extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tables: [

      ]
    }
  }

  componentDidMount() {
    this.props.setCurrentPage(LEARN);
  }

  render() {
    const tables = [];
    for(let iTable = 0; iTable < 10; iTable += 1) {
      for(let iMultiple = 1; iMultiple <= 12; iMultiple += 1) {
        if(iMultiple === 1) {
          tables[iTable] = [];
        }
        tables[iTable].push({ table: iTable + 1, multiple: iMultiple });
      }
    }

    const timesTables = tables.map((table, key) => {
      const backgroundColor = randomColor();
      const color = invertColor(backgroundColor);
      return (
        <div className="table-column" key={key} style={{ backgroundColor, color }}>
          <h3 style={{ borderBottom: `1px solid ${color}` }}> {key + 1} Times Table</h3>
          {
            table.map(multiple => (
              <div key={multiple.multiple} className="table-multiple">
                <span className="table-number">{multiple.multiple}</span><span className="table-symbol">x</span><span className="table-number">{multiple.table}</span><span className="table-equal-symbol">=</span><span className="table-number">{multiple.table * multiple.multiple}</span>
              </div>
            ))
          }
        </div>
      )
    });

    return (
      <div className="learn-page-wrapper">
        {timesTables}
      </div>
    );
  }
}
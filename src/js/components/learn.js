import React from 'react';
import { LEARN } from '../constants/pages';

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
      return (
        <div className="table-column" key={key}>
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
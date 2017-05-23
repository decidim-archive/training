import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import selections from '../lib/selection';
import data from '../lib/data';

import SelectionItem from './SelectionItem';
import SelectionSummary from './SelectionSummary';

export default class Selection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {sels: []};
  }

  componentDidMount() {
    selections.reset();
    const selectionsP = selections.toItemsProperty();
    selectionsP.onValue(sels => this.setState({sels}));
  }

  render() {
    const sels = this.state.sels;
    const selectionsExist = !_.isEmpty(sels);
    const summary = selections.selectionSummary(sels);
    const phrase = data.phrases();

    const selectionClear =
      <div className="actions clear">
        <a className="deselect-all"
          href="#"
          onClick={selections.reset}>
          <span className="tip">{phrase.selectionClear}</span>
        </a>
      </div>;
    const selectionExport =
      <div className="actions export">
        <Link className="print"
          to={{pathname: 'print',
            state: {sels, locale: this.props.locale}}} >
          <i className="fa fa-print" />
          <span className="tip">{phrase.selectionExport}</span>
        </Link>
      </div>;

    const showSelections =
      <div>
        <div id="main">
          <ul className="selections">
            {_.map(sels, (item, idx) =>
              <SelectionItem key={item.id}
                             id={item.id}
                             item={item}
                             first={idx === 0}
                             last={idx >= (summary.size - 1)}
                             locale={this.props.locale}/>)}
          </ul>
          <SelectionSummary
            summary={summary}
            locale={this.props.locale}
          />
        </div>
      </div>;

    return (
      <div className={`col col-md-3 ${selectionsExist}`} id="selection">
        <label className="selections btn close hidden-md hidden-lg"
               onClick={this.props.tabSelected}>
          <i className="fa fa-remove" />
          <div className="selections">close</div>
        </label>
        <div className="heading">
          <h3>{phrase.selectionTitle}</h3>
          <label className="selections btn" onClick={this.props.tabSelected}>
            <span className="selections badge">
              {summary.size}
              {selectionsExist ? selectionClear : ' '}
            </span>
            <div>{this.props.showTab === 'selections' ? '' : 'selections'}</div>
          </label>
          {selectionsExist ? selectionExport : ' '}
          <p>{phrase.selectionInstruction}</p>
        </div>
        {selectionsExist ? showSelections : ' '}
      </div>
    );
  }
}

Selection.displayName = 'Selection';

Selection.propTypes = {
  phrases: React.PropTypes.array,
  tabSelected: React.PropTypes.func,
  showTab: React.PropTypes.string,
  locale: React.PropTypes.string,
};

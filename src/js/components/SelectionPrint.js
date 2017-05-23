import _ from 'lodash';
import React from 'react';
import {IndexLink} from 'react-router';

import selection from '../lib/selection';
import { durationFormat, getIcon } from '../lib/utils';
import dat from '../lib/data';

import SelectionSummary from './SelectionSummary';
import SessionSection from './SessionSection';

export default class SelectionPrint extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentDidMount() {
    window.print();
  }

  render() {
    const seles = this.state.location.state.sels;
    const summaryBlock = selection.selectionSummary(seles);
    const phrases = dat.phrases();
    return (
      <div id="print-page">
        {/* hide on print */}
        <div className="hidden-print intro session">
          <IndexLink to="/" className="home-link">
            <i className="fa fa-chevron-left" />{phrases.back}
          </IndexLink>
          <div className="title">Print Preview</div>
          <div className="printout">
            <span className="help">{phrases.printHelp}</span>
          </div>
        </div>
        {/* style for print */}
        <div id="print">
          <div className="summary-page">
            <div className="toc">
              <h2>{phrases.selectedSessionsLabel}</h2>
              <ol className="sessions">
                {_.map(seles, ({id, title, item, sections}) =>
                <li key={id} className="session">
                  <div className="title">
                    {title}
                    <i className={`fa ${getIcon(item)}`} />
                    <span className="item-type">
                      {item}
                    </span>
                  </div>
                  <ul>
                    {_.map(sections, (elem) =>
                      <li key={elem.title}>{elem.title}</li>
                    )}
                  </ul>
                </li>
                )}
              </ol>
            </div>
            <SelectionSummary summary={summaryBlock} />
          </div>
          <ol className="session-items">
            {_.map(seles, ({id, title, summary, activities, sections,
              prerequesites, meta, materials}, k) =>
            <li key={id} className="session-item">
              <h2><span className="serial">{k + 1}. </span>{title} - <span className="duration">
                              {meta.duration ? durationFormat(meta.duration) : ''}
                            </span></h2>
              <ul className="tags">
                <strong>Tags: </strong>
                {_.map(meta.tags, (item, i) => <li className="tag"
                    key={i}>{item}, </li>)}
              </ul>
              <SessionSection
              sections={sections}
              meta={meta}
              prerequesites={prerequesites}
              materials={materials}
              activities={activities} />
            </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

SelectionPrint.displayName = 'Print';

SelectionPrint.propTypes = {
  phrases: React.PropTypes.array,
};

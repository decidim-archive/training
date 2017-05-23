import _ from 'lodash';
import React from 'react';

import { durationFormat, materialsTitle, getAttachments } from '../lib/utils';
import data from '../lib/data';

export default class SelectionSummary extends React.Component {

  render() {
    const {summary} = this.props;
    const phrases = data.phrases();
    const uniqMaterials = _.uniqBy(summary.materials, 'id');
    const attachments = getAttachments(_.uniq(_.map(uniqMaterials, 'id')));
    return (
      <div className="summary">
        <h2>{phrases.summaryTitle}</h2>
        <div className="count">{phrases.selectedSessions}<strong>{summary.size}</strong>
        </div>
        <div className="duration">
         {phrases.totalDuration}
         <strong> {durationFormat(summary.duration, this.props.locale)}</strong>
        </div>
        <ul className="materials">
          <span>{phrases.materialsNeeded} </span>
          {_.map(uniqMaterials, ({id: v}, k) =>
              <li key={k}>{materialsTitle(v)}</li>
          )}
        </ul>
        <ul className={`attachments ${_.isEmpty(attachments) ? 'hide' : ''}`}>
        <div className="title">{phrases.downloadsHeading} </div>
          {_.map(attachments, ({link, label}, idx) =>
            <li key={idx}>
              <a href={link} title={label}>{label}</a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

SelectionSummary.displayName = 'SelectionSummary';

SelectionSummary.propTypes = {
  summary: React.PropTypes.object,
  locale: React.PropTypes.string,
};

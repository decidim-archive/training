import _ from 'lodash';
import React from 'react';

import data from '../lib/data';
import SessionItem from './SessionItem';
import fils from '../lib/filters';

export default class Session extends React.Component {
  constructor(props) {
    super(props);
    this.showSize = this.showSize.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.state = {sessions: this.props.sessions , phrases: data.phrases(), superSize: _.size(data.sessions())};
  }


  componentWillReceiveProps(nextProps) {
    this.setState({state: nextProps})
  }

  checkSize() {
    return (this.props.superSize === _.size(this.props.sessions));
  }
  showSize() {
    return this.checkSize() ?
      this.props.superSize :
      `${_.size(this.props.sessions)} of ${this.props.superSize}`;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const currs = this.props.sessions;
    const phrase = this.props.phrases;
    const sortedSessions = _.sortBy(currs, 'title');
    const resetButton =
      <label className="tip" onClick={_.partial(fils.set)}>reset</label>;
    const newSessionSubTitle = <div className="sub-title"
                            dangerouslySetInnerHTML={{__html: phrase.sessionSubTitle}} />;

    return (
      <div className="col col-md-6" id="sessions">
        <div className="heading">
          <h3>{phrase.mainColumnHeading}</h3>
          <span className="badge">
            {this.showSize()}
            {this.checkSize() ? '' : resetButton}
          </span>
          {newSessionSubTitle}
        </div>
        <ul className="session-items">
          {_.map(sortedSessions,
          ({id, item, description, filters, title, tags, summary, meta, materials,
            activities, prerequesites, selected, sections}) =>
            <SessionItem
              key={id}
              item={item}
              id={id}
              description={description}
              filters={filters}
              title={title}
              tags={tags}
              summary={summary}
              meta={meta}
              materials={materials}
              activities={activities}
              prerequesites={prerequesites}
              selected={selected}
              sections={sections}
              phrases={phrase}
            />
          )}
        </ul>
      </div>
    );
  }
}

Session.displayName = 'Session';

Session.propTypes = {
  superSize: React.PropTypes.number,
  phrases: React.PropTypes.array,
  tabSelected: React.PropTypes.func,
  sessions: React.PropTypes.array,
};

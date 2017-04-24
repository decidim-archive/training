import _ from 'lodash';
import React from 'react';

import { durationFormat } from '../lib/utils';
import selections from '../lib/selection';

import SessionSection from './SessionSection';
import SessionTag from './SessionTag';

export default class SessionItem extends React.Component {

  constructor(props) {
    super(props);
    this.moreLess = this.moreLess.bind(this);
    this.state = {previewState: false};
  }

  moreLess(e) {
    this.setState({previewState: !this.state.previewState});
  }

  render() {
    const {
      id,
      item,
      title,
      selected,
    } = this.props;
    const phrase = this.props.phrases;
    const metas = this.props.meta;
    return (
      <li key={id}
          className={
            `session-item ${item}
            ${selected ? 'selected' : 'available'}
            ${this.state.previewState ? 'less' : 'more'}`}>
        <label
          className="btn btn-xs btn-session-select"
          onClick={_.partial(selections.add, this.props.id)}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        <span>{phrase.selectButton}</span>
        </label>
        <label
          className="btn deselect"
          onClick={_.partial(selections.remove, this.props.id)}>
          <i className="fa fa-times-circle" />
          {phrase.deselectButton ? phrase.deselectButton : 'Deselect'}
        </label>
        <h4>
          {title}
          <div className="duration">
            <i className="fa fa-clock-o" />
            {durationFormat(metas.duration)}
          </div>
          <div className="tags">
          {_.map(this.props.tags, (elems, keys) =>
            <SessionTag data={elems} key={`${id}'-'${keys}`}/>
          )}
          </div>
        </h4>
        <p>{metas.description}</p>
        <label
          onClick={this.moreLess}
          className="btn btn-xs btn-default btn-session-preview">
          <i
          className={`fa fa-caret-${this.state.previewState
            ? 'up' : 'down'}`}
          aria-hidden="true"></i>
          {this.state.previewState ?
            phrase.previewButtonCollapse :
            phrase.previewButtonExpamd}
        </label>
        <div>
          <SessionSection
          id={id}
          sections={this.props.sections}
          prerequesites={this.props.prerequesites}
          materials={this.props.materials}
          activities={this.props.activities}
          moreLess={this.moreLess}
          meta={metas}/>
        </div>
      </li>
    );
  }
}

SessionItem.displayName = 'SessionItem';

SessionItem.propTypes = {
  id: React.PropTypes.string,
  description: React.PropTypes.string,
  filters: React.PropTypes.array,
  title: React.PropTypes.string,
  tags: React.PropTypes.array,
  summary: React.PropTypes.array,
  meta: React.PropTypes.object,
  materials: React.PropTypes.array,
  activities: React.PropTypes.array,
  prerequesites: React.PropTypes.array,
  selected: React.PropTypes.bool,
  sections: React.PropTypes.array,
  phrases: React.PropTypes.array,
  icons: React.PropTypes.array,
  item: React.PropTypes.string,
};

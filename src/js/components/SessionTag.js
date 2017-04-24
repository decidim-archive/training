import _ from 'lodash';
import React from 'react';
import filters from '../lib/filters';

import { getIcon } from '../lib/utils';

export default class SessionTag extends React.Component {
  constructor(props) {
    super(props);
    this.high = '';
  }
  componentDidMount() {
    const filtersP = filters.toItemsProperty();
    filtersP.onValue(fils => {
      const f = _(fils.tags).pickBy().keys().value();
      this.high = _.includes(f, this.props.data) ? 'active' : '';
    });
  }

  render() {

    const icon = getIcon(this.props.data);
    return (
      <i className={`fa ${icon} tag ${this.high}`} title={this.props.data}/>
    );
  }
}

SessionTag.displayName = 'SessionTag';

SessionTag.propTypes = {
  data: React.PropTypes.string,
};

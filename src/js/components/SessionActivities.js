import _ from 'lodash';
import React from 'react';

import { durationFormat, getActivity } from '../lib/utils';


export default class SessionActivities extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    const activity = getActivity(this.props.id);
    const title = activity ? _.get(activity, 'title') : '';
    let newdata = '';
    if (this.state.data) {
      newdata = <div dangerouslySetInnerHTML={{__html: this.state.data}} />;
    }
    return (
      <div>
        <h6>{title}</h6>
        <div className={`'duration' ${this.state.duration ? 'show' : 'hide'}`}>
          {durationFormat(this.state.duration)}
          </div>
        {newdata}
      </div>
    );
  }
}

SessionActivities.displayName = 'SessionActivities';

SessionActivities.propTypes = {
  id: React.PropTypes.string,
};

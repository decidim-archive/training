import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { durationFormat } from '../lib/utils';

import selections from '../lib/selection';

export default class SelectionItem extends React.Component {
  constructor(props) {
    super(props);
    this.moveUpButton = this.moveUpButton.bind(this);
    this.moveDownButton = this.moveDownButton.bind(this);
  }


  moveUpButton() {
    const { id, first } = this.props;

    return first ? '' : (
      <li>
        <span role="button" className="btn btn-sm btn-up"
         onClick={_.partial(selections.moveUp, id)}>
          <i className="fa fa-lg fa-arrow-up" aria-hidden="true"></i>
        </span>
      </li>);
  }

  moveDownButton() {
    const { id, last } = this.props;

    return last ? '' : (
      <li>
        <span role="button" className="btn btn-sm btn-down"
        onClick={_.partial(selections.moveDown, id)}>
          <i className="fa fa-lg fa-arrow-down" aria-hidden="true"></i>
        </span>
      </li>);
  }

  render() {
    const { item } = this.props;
    const duration = durationFormat(item.duration);
    return (
      <li key={item.id} className={item.item}>
        <h6>{item.title}</h6>
        <div>
          <i className="fa fa-clock-o" />
          <span className="duration"> {duration}</span>
        </div>

        <ul className="actionButtons leftActionButtons">
        {this.moveUpButton()}
        {this.moveDownButton()}
        </ul>
        <ul className="actionButtons">
          <li>
            <Link className="print"
              to={{pathname: 'print', state: {sels: [item]}}} >
                <i className="fa fa-print" />
            </Link>
          </li>
          <li><span role="button" className="btn btn-sm btn-delete"
          onClick={_.partial(selections.remove, item.id)}>
          <i className="fa fa-lg fa-trash" aria-hidden="true"></i></span>
          </li>
        </ul>
      </li>
    );
  }
}

SelectionItem.displayName = 'SelectionItem';

SelectionItem.propTypes = {
  item: React.PropTypes.object,
  id: React.PropTypes.string,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
};

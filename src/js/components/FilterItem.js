import React from 'react';
import _ from 'lodash';
import { getIcon, getCounts } from '../lib/utils';
import filters from '../lib/filters';

export default class FilterItem extends React.Component {

  constructor(props) {
    super(props);
    this.clickFilter = this.clickFilter.bind(this);
    this.isChecked = false;
  }

  clickFilter(e) {
    filters.update(e.target.id, e.target.checked, e.target.className);
  }

  render() {

    const icon = getIcon(this.props.name);
    const c = getCounts(this.props.name, this.props.filterType);
    return (
      <li className={`filter ${this.props.name}`}>
        <input id={this.props.name}
              className={`${this.props.filterType} checkbox`}
              checked={this.props.checkedState}
              type="checkbox"
              onChange={this.clickFilter} />
          <label htmlFor={this.props.name}>

            <i key={icon}
              className={`fa ${icon} fa-3x icon btn`}
              title={this.props.displayName} />
            <span className="filter-label">{this.props.displayName}</span>
            <span className="filter-count">({c})</span>
          </label>
      </li>
    );
  }
}

FilterItem.displayName = 'FilterElem';

FilterItem.propTypes = {
  name: React.PropTypes.string,
  displayName: React.PropTypes.string,
  filterType: React.PropTypes.string,
  checkedState: React.PropTypes.bool,
};

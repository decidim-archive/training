import React from 'react';
import _ from 'lodash';

import FilterItem from './FilterItem';

import filters from '../lib/filters';
import data from '../lib/data';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fils: {} };
  }

  componentDidMount() {
    const filtersP = filters.toItemsProperty();
    // const localeP = locales.toItemsProperty();

    filtersP.onValue(fils => this.setState({fils}));
  }


  render() {
    const afils = this.props.fils;
    const phrase = data.phrases();

    const typeFilters =
      (_.size(afils.items > 1)) ?
      <ul className="items">
        {_.map(afils.items, (e, i) =>
          <FilterItem
            key={i}
            name={i}
            filterType={'item'}
            displayName={i}
            checkedState={e} />
        )}
      </ul>
      :
      '';

    return (
      <div className="col col-md-3" id="filters">

        <div className="heading">
          <label
          className={`filters btn badge hidden-md hidden-lg
            ${this.props.showTab === 'filters' ? 'close' : ''}`} onClick={this.props.tabSelected}>
            <i className={`filters fa fa-${this.props.showTab === 'filters'
                                          ? 'remove' :
                                          'filter'}`} />
            <div className="filters">{this.props.showTab === 'filters'
                                          ? 'close' :
                                          'filters'}</div>
          </label>
          <h3>
            {phrase.filtersTitle}
          </h3>
          <div className="sub-title">{phrase.filtersInstruction}</div>
        </div>
        {typeFilters}
        <h4>{phrase.filtersSubTitle}</h4>
        <ul className="items">
          {_.map(afils.tags, (e, i) =>
            <FilterItem
              key={i}
              name={i}
              filterType={'tags'}
              displayName={i}
              checkedState={e} />
          )}
        </ul>
      </div>
	);
  }
}

Filter.displayName = 'Filter';

Filter.propTypes = {
  phrases: React.PropTypes.array,
  tabSelected: React.PropTypes.func,
  showTab: React.PropTypes.string,
  fils: React.PropTypes.object,
};

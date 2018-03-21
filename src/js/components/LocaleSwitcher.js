import _ from 'lodash';
import React from 'react';
// import locales from '../lib/locales';
import data from '../lib/data';

export default class LocaleSwticher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      locale: data.locales(),
      defaultLocale: data.defaultLocale()};
  }

  render() {
    const locales = data.locales();
    const defaultLocale = data.defaultLocale();
    const switcher =
      (_.size(this.state.locale) > 1) ?
      <select
        className="language-switcher"
        onChange={this.props.changeLocale}
        defaultValue={this.props.selectedLocale.code ?
          this.props.selectedLocale.code :
          defaultLocale.code}
      >
        <option id="select language">...</option>
        {_.map(locales, (loc) =>
          <option id={loc.code} key={loc.code} value={loc.code}>{loc.name}</option>
        )}
      </select>
      :
      '';

    return (
      <div>
        {switcher}
      </div>
    );
  }
}

LocaleSwticher.displayName = 'LocaleSwticher';

LocaleSwticher.propTypes = {
  locales: React.PropTypes.array,
  selectedLocale: React.PropTypes.object,
  changeLocale: React.PropTypes.func,
};

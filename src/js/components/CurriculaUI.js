import _ from 'lodash';
import React from 'react';
import Bacon from 'baconjs';
import Promise from 'bluebird';

import data from '../lib/data';
import session from '../lib/session';
import filters from '../lib/filters';
import selections from '../lib/selection';
import locales from '../lib/locales';
import { defaultLocale } from '../../../config/base-settings';

import LocaleSwitcher from './LocaleSwitcher';
import IntroSection from './IntroSection';
import Filter from './Filter';
import Session from './Session';
import Selection from './Selection';

import '../../scss/app.scss';

export default class CurriculaUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTab: 'sessions',
      startAffixOffset: 275,
      stopAffixOffset: 400,
      startPos: 0,
      fils: {},
      locale: {},
      sessions: [],
      selections: [],
      phrases: [],
      icons: [],
    };
    this.tabSelected = this.tabSelected.bind(this);
    this.affixer = this.affixer.bind(this);
    this.changeLocale = this.changeLocale.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  resetData() {
    Promise.all([data.fetch(defaultLocale.code)])
      .then(() => session.reset(data.sessions()))
      .then(() => filters.set())
      .then(() => selections.reset());
  }

  back(e) {
    e.preventDefault();
    this.resetData();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.affixer);
    this.startPos = document.getElementById('filters').style.top;
    this.resetData();
    const showTab = 'sessions';
    const phrases = data.phrases();
    const icons = data.icons();
    const sessionsP = session.toItemsProperty();
    const selectionsP = selections.toItemsProperty();
    const filtersP = filters.toItemsProperty();
    const localesP = locales.toItemsProperty();
    const appState = Bacon.combineTemplate({
      fils: filtersP,
      locale: localesP,
      sessions: sessionsP,
      selections: selectionsP,
    });

    appState.onValue(state => this.setState(state));
    this.setState({icons, phrases, showTab});
    window.onpopstate = this.back;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.affixer);
    this.resetData();
  }

  tabSelected(e) {
    const tab = e.target.className.substring(0, e.target.className.indexOf(' '));
    this.setState({showTab: (this.state.showTab === 'sessions' ? tab : 'sessions')});
  }

  affixer(e) {
    // change wrapper div classname to trigger affix
    this.affixWrapper.className = (e.target.body.scrollTop > this.state.startAffixOffset) ?
    'scrolled wrap'
    : 'wrap';

    // trigger scrolling of sidebars when footer scrolls up
    const wrapperHeight = document.getElementById('wrap').clientHeight;
    const startScrollPos = (wrapperHeight - this.state.stopAffixOffset);
    if (e.target.body.scrollTop > (wrapperHeight - this.state.stopAffixOffset)
    && window.matchMedia('(min-width: 993px)').matches) {
      document.getElementById('filters').style.top = this.startPos +
      (startScrollPos - e.target.body.scrollTop);
      document.getElementById('selection').style.top = this.startPos +
      (startScrollPos - e.target.body.scrollTop);
    } else if (window.matchMedia('(min-width: 993px)').matches) {
      document.getElementById('filters').style.top = this.startPos;
      document.getElementById('selection').style.top = this.startPos;
    }
  }

  changeLocale(e) {
    locales.update(e.target.value);
    Promise.all([data.fetch(e.target.value)])
      .then(() => session.reset(data.sessions()))
      .then(() => filters.set());
  }


  render() {
    const phrases = this.state.phrases;
    const icons = this.state.icons;
    const superSize = _.size(data.sessions());
    return (
      <div className="container-fluid">
        <div className={`main-content ${this.state.showTab}`}>
          <IntroSection phrases={phrases} />
          <div id="language-switcher">
            <LocaleSwitcher
              locales={this.state.locales}
              selectedLocale={this.state.locale}
              changeLocale={(e) => this.changeLocale(e)}
            />
          </div>
          <div id="wrap" className="wrap" ref={(ref) => { this.affixWrapper = ref; } }>
            <Filter
              icons={icons}
              phrases={phrases}
              tabSelected={this.tabSelected}
              showTab={this.state.showTab}
              fils={this.state.fils}
              />
            <Session
              sessions={this.state.sessions}
              icons={icons}
              tabSelected={this.tabSelected}
              superSize={superSize}
              phrases={phrases}
              />
            <Selection
              selections={this.state.selections}
              showTab={this.state.showTab}
              tabSelected={this.tabSelected}
              />
          </div>
        </div>
      </div>
    );
  }
}

CurriculaUI.displayName = 'CurriculaUI';

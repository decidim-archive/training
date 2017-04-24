import _ from 'lodash';
import React from 'react';
import Bacon from 'baconjs';

import data from '../lib/data';
import session from '../lib/session';
import filters from '../lib/filters';
import selections from '../lib/selection';
import locales from '../lib/locales';

import LocaleSwitcher from './LocaleSwitcher';
import Selection from './Selection';
import Session from './Session';
import IntroSection from './IntroSection';
import Filter from './Filter';

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
  }

  componentDidMount() {
    window.addEventListener('scroll', this.affixer);
    this.startPos = document.getElementById('filters').style.top;
    const showTabP = 'sessions';
    data.fetch(data.defaultLocale().code);
    session.reset(data.sessions());
    filters.set();
    const sessionsP = session.toItemsProperty();
    const selectionsP = selections.toItemsProperty();
    const filtersP = filters.toItemsProperty();
    const localesP = locales.toItemsProperty();
    const phrasesP = data.phrases();
    const iconsP = data.icons();
    const appState = Bacon.combineTemplate({
      fils: filtersP,
      showTab: showTabP,
      locale: localesP,
      sessions: sessionsP,
      selections: selectionsP,
      phrases: phrasesP,
      icons: iconsP,
    });

    appState.onValue(state => this.setState(state));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.affixer);
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
    data.fetch(e.target.value);
    session.reset(data.sessions());
    filters.set();
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    const phrases = this.state.phrases;
    const icons = this.state.icons;
    const superSize = _.size(data.sessions());
    return (
      <div className="container-fluid">
        <div className={`main-content ${this.state.showTab}`}>
          <IntroSection phrases={phrases} />
          <div id="wrap" className="wrap" ref={(ref) => { this.affixWrapper = ref; } }>
            <LocaleSwitcher
              locales={this.state.locales}
              selectedLocale={this.state.locale}
              changeLocale={(e) => this.changeLocale(e)}
            />
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

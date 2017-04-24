import _ from 'lodash';
import React from 'react';

import { getAttachments } from '../lib/utils';
import dat from '../lib/data';
import SessionSectionItem from './SessionSectionItem';

export default class SessionSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
    this.tabHandler = this.tabHandler.bind(this);
    this.showHide = this.showHide.bind(this);
    this.checkActive = this.checkActive.bind(this);
    this.checkSection = this.checkSection.bind(this);
    this.state = {tabName: 'getting-started'};
  }

  showHide(s) {
    const propsStr = 'this.props.'.concat(s);
    const sh = !_.isEmpty(propsStr) ? 'show' : 'hide';
    return sh;
  }


  checkActive(s) {
    const c = this.state.tabName === s ? 'active' : '';
    return c;
  }

  checkSection(e) {
    const c = this.state.tabName === e ? 'show' : 'hide';
    return c;
  }

  tabHandler(e) {
    const tabName = e.target.className.substring(0, e.target.className.indexOf(' '));
    this.setState({tabName});
  }

  render() {
    const {
      meta,
    } = this.props;
    const phrases = dat.phrases();
    const tabs = {
      'getting-started': phrases.gettingStartedTab, // has to have - in it so it matches the classname
      'sessions-breakdown': phrases.sessionBreakdownTab,
    };
    const attachments = getAttachments(_.uniq(_.map(this.props.materials, 'id')));
    return (
      <div className="collapse">

        <div className="tabs">
          {_.map(tabs, (e, i) =>
            <label
              key={i}
              className={`${i} tab ${this.showHide(i)} ${this.checkActive(i)}`}
              onClick={this.tabHandler}>
              {e}
            </label>
          )}
        </div>
        <div className={`getting-started section ${this.checkSection('getting-started')}`}>
            {_.map(this.props.prerequesites,
              ({title: ptitle, duration: pduration, data: pdata}, pk) =>
              <SessionSectionItem
                key={pk}
                title={ptitle}
                duration={pduration}
                data={pdata}
                />
            )}
            <div className={`block ${_.isEmpty(attachments) ? 'hide' : ''}`}>
              <h4 className="attachments">{phrases.attachmentsLabel}</h4>
              <p className="help">{phrases.downloadsHelpText}</p>
              <ul>
                {_.map(attachments, ({link, label}, idx) =>
                  <li key={idx}>
                    <a href={link} title={label}>{label}</a>
                  </li>
                )}
              </ul>
            </div>
            <div className="block">
              <div className={`author ${meta.source ? '' : 'hide'}`}>
                <h5>{phrases.sources}</h5>{meta.source}
              </div>
              <div className={`contributors ${meta.contributors ? '' : 'hide'}`}>
                <h5>{phrases.contributors}</h5>
                  <ul>
                    {_.map(meta.contributors, (e, i) =>
                      <li key={i}>{e}</li>
                    )}
                  </ul>
              </div>
            </div>
        </div>
        <div className={`sessions-breakdown section ${this.checkSection('sessions-breakdown')}`}>
            {_.map(this.props.sections, ({title: stitle, duration: sduration, data: sdata}, sk) =>
                <SessionSectionItem
                  key={sk}
                  title={stitle}
                  duration={sduration}
                  data={sdata}
              />
            )}
        </div>
        <label
          onClick={this.props.moreLess}
          className="btn btn-xs btn-default pull-right btn-session-collaps">
            <i className="fa fa-caret-up" fa-2x aria-hidden="true"></i>
            {phrases.previewButtonCollapse}
        </label>
      </div>
    );
  }
}

SessionSection.displayName = 'SessionSection';

SessionSection.propTypes = {
  id: React.PropTypes.string,
  sections: React.PropTypes.array,
  prerequesites: React.PropTypes.array,
  activities: React.PropTypes.array,
  materials: React.PropTypes.array,
  moreLess: React.PropTypes.func,
  meta: React.PropTypes.object,
};

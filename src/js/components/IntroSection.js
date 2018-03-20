import React from 'react';

export default class IntroSection extends React.Component {

  render() {
    return (
      <div className="intro session container-fluid">
        <div className="row">
        <div className="col col-md-3"></div>
        <div className="col col-md-6">
          <img alt="Decidim logo" className="logo" src="https://d33wubrfki0l68.cloudfront.net/c8a989ae15c4def77353ab677084cf68e6a9c754/d6de4/images/decidim-logo.svg" />
        </div>
      </div>
    </div>
    );
  }
}

IntroSection.displayName = 'Intro Section';

IntroSection.propTypes = {
  phrases: React.PropTypes.array,
};

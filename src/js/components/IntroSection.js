import React from 'react';

export default class IntroSection extends React.Component {

  render() {
    return (
      <div className="intro session container-fluid">
        <div className="row">
        <div className="col col-md-3"></div>
        <div className="col col-md-6">
          <img alt="Decidim logo" className="logo" src="https://decidim-barcelona.s3.amazonaws.com/uploads/decidim/organization/logo/1/medium_tHG04IS.png" />
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

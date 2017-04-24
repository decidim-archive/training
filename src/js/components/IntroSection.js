import React from 'react';

export default class IntroSection extends React.Component {

  render() {
    const phrase = this.props.phrases;
    return (
			<div className="intro session container-fluid">
        <div className="row">
					<div className="col col-md-3"></div>
					<div className="col col-md-6">
						<h1>{phrase.siteTitle}</h1>
            <p className="subs">{phrase.siteSubTitle}</p>
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

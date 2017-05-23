import React from 'react';


export default class SessionSectionItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }


  render() {
    let newdata = '';
    if (this.state.data) {
      newdata = <div dangerouslySetInnerHTML={{__html: this.state.data}} />;
    }
    return (
      <div className="block">
        <h4>{this.state.title}</h4>
        {newdata}
      </div>
    );
  }
}

SessionSectionItem.displayName = 'SessionSectionItem';

SessionSectionItem.propTypes = {
  title: React.PropTypes.string,
  duration: React.PropTypes.string,
  data: React.PropTypes.string,
  locale: React.PropTypes.string,
};

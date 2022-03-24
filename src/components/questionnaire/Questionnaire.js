import React from 'react';

export default class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>{this.props.title} comes here!</p>
  }
}

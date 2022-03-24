import React from 'react';
import Button from '../shared/Button';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <div className='navigation'>
        <Button onClick={(e) => this.props.onClick("questionnaire", 1, e)}>Continue 1</Button>
        <Button onClick={(e) => this.props.onClick("questionnaire", 2, e)}>Continue 2</Button>
        <Button onClick={(e) => this.props.onClick("questionnaire", null, e)}>New</Button>
        <Button onClick={(e) => this.props.onClick("template", null, e)}>Template</Button>
        <Button onClick={(e) => this.props.onClick("archive", null, e)}>Archive</Button>
      </div>
    );
  }
}

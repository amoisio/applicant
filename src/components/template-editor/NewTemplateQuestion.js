import React from 'react';
import Button from '../shared/Button';

export default class NewTemplateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAdd() {
    const text = this.state.value;
    this.props.onAdd(text);
    this.setState({ value: '' });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className='template-question new-template-question'>
        <input
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleAdd}>Add</Button>
      </div>
    );
  }
}

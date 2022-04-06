import React from 'react';
import Button from '../shared/Button';
import { trimmedOrDefault } from '../../models/common';
/**
 * New template question component for adding a question to a template
 * @param {function} onAdd onAdd(text: string) callback function called when clicks 'Add'
 */
export default class NewTemplateQuestion extends React.Component {
  constructor(props) {
    super(props);
    if (!props.onAdd) {
      throw new Error('onAdd callback not defined.');
    }
    this.state = {
      value: '',
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get onAdd() {
    return this.props.onAdd;
  }

  handleAdd() {
    const text = trimmedOrDefault(this.state.value);
    if (text) {
      this.onAdd(text);
    }
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

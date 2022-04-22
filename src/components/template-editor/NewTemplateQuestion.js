import React from 'react';
import Button from '../shared/Button';
import { trimmedOrDefault } from '../../models/common';
import Icon from '../shared/Icon';
import AutoGrowTextarea from '../shared/AutoGrowTextarea';

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

  handleChange(modifiedText) {
    this.setState({ value: modifiedText });
  }

  render() {
    return (
      <div className='template-question new-template-question'>
        <AutoGrowTextarea
          placeholder='New question text...'
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Button onClick={this.handleAdd} className='action-button'>
          <Icon icon='plus-lg' />
        </Button>
      </div>
    );
  }
}

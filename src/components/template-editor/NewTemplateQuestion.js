import React from 'react';
import Button from '../shared/Button';
import { trimmedOrDefault } from '../../models/common';
import Icon from '../shared/Icon';
import AutoGrowTextarea from '../shared/AutoGrowTextarea';
import { useState } from 'react';

/**
 * New template question component for adding a question to a template
 * @param {function} onAdd onAdd(text: string) callback function called when clicks 'Add'
 */
export default function NewTemplateQuestion({ onAdd }) {
  const [ state, setState ] = useState({
    value: ''
  });

  if (!onAdd) {
      throw new Error('onAdd callback not defined.');
  }
  
  const handleAdd = () => {
    const text = trimmedOrDefault(state.value);
    if (text) {
      onAdd(text);
    }
    setState({ value: '' });
  }

  const handleChange = (modifiedText) => {
    setState({ value: modifiedText });
  }

  return (
    <div className='new-template-question'>
      <AutoGrowTextarea
        placeholder='New question text...'
        onChange={handleChange}
        value={state.value}
      />
      <Button onClick={handleAdd} className='action-button'>
        <Icon icon='plus-lg' />
      </Button>
    </div>
  );
}

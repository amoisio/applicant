import React, { useState } from 'react';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import NavLink from '../shared/NavLink';
import InputText from '../shared/InputText';
import { trimmedOrDefault } from '../../models/common';
import './Navigation.css';

/**
 * Landing page navigation component.
 * @param {any[]} questionnaires List of open questionnaires.
 * @param {function} onOpenQuestionnaire onOpenQuestionnaire(id: string) callback called when clicking on the questionnaire's button.
 * @param {function} onCreateQuestionnaire onCreateQuestionnaire(title: string) callback called when clicking on the 'New' button.
 */
export default function NavigationView({ questionnaires, onOpenQuestionnaire, onCreateQuestionnaire }) {

  const [questionnaireTitle, setQuestionnaireTitle] = useState('');

  const elements = questionnaires.map((q) => {
    var total = q.questions.length;
    var answered = q.questions.map((q) => trimmedOrDefault(q.answer)).filter(a => a !== null).length;
    return (
      <div className='nav-link-with-count' key={q.id}>
        <NavLink onClick={() => onOpenQuestionnaire(q)}>
          {q.title}
          <Icon icon='chevron-right' />
        </NavLink>
        <span className='count'>
          {answered} / {total}
        </span>
      </div>
    );
  });
  return (
    <main className='navigation'>
      <div className='new-questionnaire'>
        <InputText
          placeholder='New questionnaire title...'
          onChange={setQuestionnaireTitle}
          value={questionnaireTitle}
        />
        <Button
          onClick={() => onCreateQuestionnaire(questionnaireTitle)}
          className='action-button'>
          <Icon icon='plus-lg' />
        </Button>
      </div>
      {elements}
    </main>
  );
}

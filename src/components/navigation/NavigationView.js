import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import NavLink from '../shared/NavLink';
import InputText from '../shared/InputText';
import { trimmedOrDefault } from '../../models/common';
import Questionnaire from '../../models/questionnaire';
import './Navigation.css';

/**
 * Landing page navigation component.
 * @param {object} templateRepository Template repository.
 * @param {object} questionnaireRepository Questionnaire repository.
 */
export default function NavigationView({ templateRepository, questionnaireRepository }) {
  if (!templateRepository) throw new Error('templateRepository must be given.');
  if (!questionnaireRepository) throw new Error('questionnaireRepository must be given.');

  const navigate = useNavigate();
  const [questionnaireTitle, setQuestionnaireTitle] = useState('');
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    const openQuestionnaires = questionnaireRepository.getActive();
    setQuestionnaires(openQuestionnaires);
  }, [questionnaireRepository]);
  
  const createQuestionnaire = () => {
    console.log('creating questionnaire');
    const template = templateRepository.getTemplate();
    const newQuestionnaire = Questionnaire.create(template, questionnaireTitle);
    questionnaireRepository.addOrUpdate(newQuestionnaire);
    setQuestionnaireTitle('');
    openQuestionnaire(newQuestionnaire.id);
  };
  const openQuestionnaire = (id) => navigate(`/questionnaire/${id}`);
  
  const elements = questionnaires.map((q) => {
    var total = q.questions.length;
    var answered = q.questions.map((q) => trimmedOrDefault(q.answer)).filter(a => a !== null).length;
    return (
      <div className='nav-link-with-count' key={q.id}>
        <NavLink to={`/questionnaire/${q.id}`}>
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
          value={questionnaireTitle} />
        <Button onClick={createQuestionnaire} className='action-button'>
          <Icon icon='plus-lg' />
        </Button>
      </div>
      {elements}
    </main>
  );
}

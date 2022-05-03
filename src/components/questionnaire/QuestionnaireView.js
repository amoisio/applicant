import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionnaireEditor from './QuestionnaireEditor';
import ViewTitle from '../shared/ViewTitle';
import './QuestionnaireView.css';

/**
 * Template view component manages template state.
 * @param {object} repository Questionnaire repository.
 */
export default function QuestionnaireView({ repository }) {
  if (!repository) throw new Error('repository must be given.');

  const navigate = useNavigate();
  const questionnaireId = useParams().questionnaireId;
  const [questionnaire, setQuestionnaire] = useState(undefined);
  const initialRender = useRef(true);

  useEffect(() => {
    const currentQuestionnaire = repository.getById(questionnaireId);
    setQuestionnaire(currentQuestionnaire);
  }, [repository, questionnaireId]);

  useEffect(() => {
    if (!questionnaire) return;
    if (initialRender.current) {
      // This prevents a redundant save once the questionnaire has been loaded
      initialRender.current = false;
    } else {
      // For subsequent changes, save the questionnaire
      repository.addOrUpdate(questionnaire);
      if (questionnaire.isCompleted) {
        navigate('/');
      }
    }
  }, [repository, questionnaire]);

  return (
    <main className='questionnaire'>
      {questionnaire && (
        <>
          <ViewTitle>{questionnaire.title}</ViewTitle>
          <QuestionnaireEditor
            questionnaire={questionnaire}
            onChange={setQuestionnaire}
          />
        </>
      )}
    </main>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import QuestionnaireEditor from './QuestionnaireEditor';
import ViewTitle from '../shared/ViewTitle';
import './QuestionnaireView.css';

/**
 * Template view component manages template state.
 * @param {string} title Questionnaire title.
 * @param {string} questionnaireId Questionnaire id.
 * @param {object} questionnaireRepository Questionnaire repository.
 */
export default function QuestionnaireView({
  title,
  questionnaireId,
  questionnaireRepository,
}) {
  if (!title) throw new Error('title must be given.');
  if (!questionnaireRepository)
    throw new Error('questionnaireRepository must be given.');
  if (!questionnaireId) throw new Error('id must be given.');

  const [questionnaire, setQuestionnaire] = useState(undefined);
  const initialRender = useRef(true);

  useEffect(() => {
    console.log(`effect - questionnaireid ${questionnaireId}`);
    const currentQuestionnaire =
      questionnaireRepository.getById(questionnaireId);
    setQuestionnaire(currentQuestionnaire);
  }, [questionnaireRepository, questionnaireId]);

  useEffect(() => {
    console.log(`effect - questionnaire ${questionnaire}`);
    if (!questionnaire) return;
    if (initialRender.current) {
      // This prevents a redundant save once the questionnaire has been loaded
      initialRender.current = false;
    } else {
      // For subsequent changes, save the questionnaire
      questionnaireRepository.addOrUpdate(questionnaire);
    }
  }, [questionnaireRepository, questionnaire]);

  return (
    <main className='questionnaire'>
      <ViewTitle>{title}</ViewTitle>
      {questionnaire && (
        <QuestionnaireEditor
          questionnaire={questionnaire}
          onChange={setQuestionnaire}
        />
      )}
    </main>
  );
}

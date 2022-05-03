import React, { useState } from 'react';
import NavigationView from './navigation/NavigationView';
import navigationKeys from './navigation/navigation-keys';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Archive from './archive/Archive';
import Questionnaire from '../models/questionnaire';
import TemplateView from './template-editor/TemplateView';
import QuestionnaireView from './questionnaire/QuestionnaireView';
import './Applicant.css';

export default function Applicant({ title, templateRepository, questionnaireRepository }) {
  if (!templateRepository) throw new Error('templateRepository must be given.');
  if (!questionnaireRepository) throw new Error('questionnaireRepository must be given');

  const [renderKey, setRenderKey] = useState(navigationKeys.navigation);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);

  const renderActiveElement = () => {
    const key = renderKey;
    console.log(`Rendering ${key} view`);
    switch (key) {
      case navigationKeys.questionnaire:
        return renderQuestionnaire(selectedQuestionnaire);
      case navigationKeys.template:
        return renderTemplate();
      case navigationKeys.archive:
        return renderArchive();
      default:
        return renderNavigation();
    }
  }
  const renderQuestionnaire = ({ id, title }) => {
    console.log(`Rendering questionnaire ${id} ${title}`);
    return (
      <QuestionnaireView
        title={title}
        questionnaireId={id}
        questionnaireRepository={questionnaireRepository} />
    );
  }
  const renderTemplate = () => {
    console.log('Rendering template');
    return (
      <TemplateView
        title='Template questions'
        templateRepository={templateRepository} />
    );
  }
  const renderArchive = () => {
    console.log('Rendering archive');
    return <Archive />;
  }
  const renderNavigation = () => {
    console.log('Rendering navigation');
    const repository = questionnaireRepository;
    const openQuestionnaires = repository.getActive();
    return (
      <NavigationView
        questionnaires={openQuestionnaires}
        onOpenQuestionnaire={openQuestionnaire}
        onCreateQuestionnaire={createQuestionnaire}
      />
    );
  }
  const openNavigation = () => {
    console.log('open navigation');
    setRenderKey(navigationKeys.navigation);
    setSelectedQuestionnaire(null);
  };
  const openQuestionnaire = (questionnaire) => {
    console.log('open questionnaire');
    setRenderKey(navigationKeys.questionnaire);
    setSelectedQuestionnaire(questionnaire);
  };
  const createQuestionnaire = (title) => {
    console.log('creating questionnaire');
    const repository = templateRepository;
    const template = repository.getTemplate();
    const newQuestionnaire = Questionnaire.create(template, title);
    openQuestionnaire(newQuestionnaire);
  };
  const openTemplate = () => {
    console.log('open template');
    setRenderKey(navigationKeys.template);
    setSelectedQuestionnaire(null);
  };
  const openArchive = () => {
    console.log('opening archive');
    setRenderKey(navigationKeys.archive);
    setSelectedQuestionnaire(null);
  };
  return (
    <div className='applicant'>
      <div className='applicant-header'>
        <Header onOpenMenu={openNavigation}>{title ?? 'Applicant'}</Header>
      </div>
      <div className='applicant-content'>
        {renderActiveElement()}
      </div>
      <div className='applicant-footer'>
        <Footer
          onOpenTemplate={openTemplate}
          onOpenArchive={openArchive}
        />
      </div>
    </div>
  );
}

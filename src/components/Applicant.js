import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './shared/Footer';
import Header from './shared/Header';
import NavigationView from './navigation/NavigationView';
import Archive from './archive/Archive';
import TemplateView from './template/TemplateView';
import QuestionnaireView from './questionnaire/QuestionnaireView';
import './Applicant.css';

const renderNavigation = (templateRepository, questionnaireRepository) => {
  return (
    <NavigationView
      templateRepository={templateRepository}
      questionnaireRepository={questionnaireRepository}
    />
  );
};

const renderQuestionnaire = (questionnaireRepository) => {
  return <QuestionnaireView repository={questionnaireRepository} />;
};

const renderTemplate = (templateRepository) => {
  return (
    <TemplateView title='Template questions' repository={templateRepository} />
  );
};

const renderArchive = (questionnaireRepository) => {
  return <Archive />;
};

export default function Applicant({ title, templateRepository, questionnaireRepository }) {
  return (
    <div className='applicant'>
      <div className='applicant-header'>
        <Header>{title ?? 'Applicant'}</Header>
      </div>
      <div className='applicant-content'>
        <Routes>
          <Route path='/'>
            <Route index element={renderNavigation(templateRepository, questionnaireRepository)} />
            <Route
              path='questionnaire/:questionnaireId'
              element={renderQuestionnaire(questionnaireRepository)}
            />
            <Route path='template' element={renderTemplate(templateRepository)} />
            <Route path='archive' element={renderArchive(questionnaireRepository)} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Routes>
      </div>
      <div className='applicant-footer'>
        <Footer />
      </div>
    </div>
  );
}

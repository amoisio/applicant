import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './shared/Footer';
import Header from './shared/Header';
import TemplateRepository from '../services/template-repository';
import QuestionnaireRepository from '../services/questionnaire-repository';
import NavigationView from './navigation/NavigationView';
import Archive from './archive/Archive';
import TemplateView from './template-editor/TemplateView';
import QuestionnaireView from './questionnaire/QuestionnaireView';
import './Applicant.css';

const renderNavigation = () => {
  return (
    <NavigationView
      templateRepository={TemplateRepository}
      questionnaireRepository={QuestionnaireRepository}
    />
  );
};

const renderQuestionnaire = () => {
  return <QuestionnaireView repository={QuestionnaireRepository} />;
};

const renderTemplate = () => {
  return (
    <TemplateView title='Template questions' repository={TemplateRepository} />
  );
};

const renderArchive = () => {
  return <Archive />;
};

export default function Applicant({ title }) {
  return (
    <div className='applicant'>
      <div className='applicant-header'>
        <Header>{title ?? 'Applicant'}</Header>
      </div>
      <div className='applicant-content'>
        <Routes>
          <Route path='/'>
            <Route index element={renderNavigation()} />
            <Route
              path='questionnaire/:questionnaireId'
              element={renderQuestionnaire()}
            />
            <Route path='template' element={renderTemplate()} />
            <Route path='archive' element={renderArchive()} />
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

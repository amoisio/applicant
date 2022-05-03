import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Applicant from './components/Applicant';
import TemplateRepository from './services/template-repository';
import QuestionnaireRepository from './services/questionnaire-repository';
import NavigationView from './components/navigation/NavigationView';
import Archive from './components/archive/Archive';
import TemplateView from './components/template-editor/TemplateView';
import QuestionnaireView from './components/questionnaire/QuestionnaireView';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const renderApplicant = () => {
  console.log('Rendering applicant');
  return <Applicant title='Applicant' />;
};

const renderNavigation = () => {
  console.log('Rendering navigation');
  return (
    <NavigationView
      templateRepository={TemplateRepository}
      questionnaireRepository={QuestionnaireRepository} />
  );
};

const renderQuestionnaire = () => {
  console.log('Rendering questionnaire');
  return <QuestionnaireView repository={QuestionnaireRepository} />;
};

const renderTemplate = () => {
  console.log('Rendering template');
  return (
    <TemplateView title='Template questions' repository={TemplateRepository} />
  );
};

const renderArchive = () => {
  console.log('Rendering archive');
  return <Archive />;
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={renderApplicant()}>
        <Route index element={renderNavigation()} />
        <Route
          path='questionnaire/:questionnaireId'
          element={renderQuestionnaire()}
        />
        <Route path='template' element={renderTemplate()} />
        <Route path='archive' element={renderArchive()} />
      </Route>
      <Route path='*' element={renderApplicant()} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

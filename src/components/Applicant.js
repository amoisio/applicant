import React from 'react';
import './Applicant.css';
import Navigation from './navigation/Navigation';
import navigationKeys from './navigation/navigation-keys';
import Questionnaire from './questionnaire/Questionnaire';
import TemplateEditor from './template-editor/TemplateEditor';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Archive from './archive/Archive';
import QuestionnaireFactory from '../models/questionnaire';
import TemplateFactory from '../models/template';
import TemplateRepository from '../services/template-repository';
import QuestionnaireRepository from '../services/questionnaire-repository';

export default class Applicant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Applicant',
      renderKey: navigationKeys.navigation,
      template: TemplateRepository.get(),
      selectedQuestionnaire: null,
      openQuestionnaires: QuestionnaireRepository.getActive(),
      completedQuestionnaires: QuestionnaireRepository.getCompleted(),
    };

    this.openNavigation = this.openNavigation.bind(this);
    
    this.createQuestionnaire = this.createQuestionnaire.bind(this);
    this.openQuestionnaire = this.openQuestionnaire.bind(this);
    this.saveQuestionnaire = this.saveQuestionnaire.bind(this);
    this.completeQuestionnaire = this.completeQuestionnaire.bind(this);
    
    this.openTemplate = this.openTemplate.bind(this);
    this.saveTemplate = this.saveTemplate.bind(this);
    
    this.openArchive = this.openArchive.bind(this);
  }

  createQuestionnaire(title) {
    console.log('Creating questionnaire');
    const template = this.state.template;
    const newQuestionnaire = QuestionnaireFactory.create(template, title);
    this.setState({
      renderKey: navigationKeys.questionnaire,
      selectedQuestionnaire: newQuestionnaire,
    });
  }

  openArchive() {
    console.log('opening archive');
    const openQuestionnaires = this.state.openQuestionnaires;
    this.setState({
      renderKey: navigationKeys.archive,
      openQuestionnaires: openQuestionnaires,
    });
  }

  openNavigation() {
    console.log('open navigation');
    this.setState({
      renderKey: navigationKeys.navigation,
      selectedQuestionnaire: null,
    });
  }

  openQuestionnaire(id) {
    console.log('open questionnaire');
    const selectedQuestionnaire = this.state.openQuestionnaires.find(
      (q) => q.id === id
    );
    this.setState({
      renderKey: navigationKeys.questionnaire,
      selectedQuestionnaire: selectedQuestionnaire,
    });
  }

  openTemplate() {
    console.log('open template');
    const template = this.state.template ?? TemplateFactory.create();
    
    this.setState({
      renderKey: navigationKeys.template,
      template: template,
    });
  }

  saveQuestionnaire(questionnaire) {
    if (questionnaire.isCompleted) {
      throw new Error('Completed questionnaires may not be saved.');
    }
    QuestionnaireRepository.addOrUpdate(questionnaire);
    this.setState({
      selectedQuestionnaire: questionnaire,
      openQuestionnaires: QuestionnaireRepository.getActive(),
    });
  }

  completeQuestionnaire(questionnaire) {
    if (questionnaire.isCompleted) {
      throw new Error('Questionnaire is already completed.');
    }
    const completedQuestionnaire = QuestionnaireFactory.complete(questionnaire);
    QuestionnaireRepository.addOrUpdate(completedQuestionnaire);
    this.setState({
      selectedQuestionnaire: completedQuestionnaire,
      openQuestionnaires: QuestionnaireRepository.getActive(),
      completedQuestionnaires: QuestionnaireRepository.getCompleted()
    });
  }

  saveTemplate(template) {
    console.log('save template');
    TemplateRepository.addOrUpdate(template);
    this.setState({
      template: template
    });
  }

  render() {
    const pageTitle = this.state.title;
    const key = this.state.renderKey;
    const element = this.renderActiveElement(key);
    return (
      <div className='applicant'>
        <Header>{pageTitle}</Header>
        <main>{element}</main>
        <Footer onClick={this.openNavigation} />
      </div>
    );
  }

  renderActiveElement(key) {
    switch (key) {
      case navigationKeys.questionnaire:
        const questionnaire = this.state.selectedQuestionnaire;
        return this.renderQuestionnaire(questionnaire);
      case navigationKeys.template:
        const template = this.state.template;
        return this.renderTemplate(template);
      case navigationKeys.archive:
        const completedQuestionnaires = this.state.completedQuestionnaires;
        return this.renderArchive(completedQuestionnaires);
      default:
        const openQuestionnaires = this.state.openQuestionnaires;
        return this.renderNavigation(openQuestionnaires);
    }
  }

  renderQuestionnaire(questionnaire) {
    console.log('Rendering questionnaire');
    return (
      <Questionnaire
        questionnaire={questionnaire}
        onSave={this.saveQuestionnaire}
        onComplete={this.completeQuestionnaire}
      />
    );
  }

  renderTemplate(template) {
    console.log('Rendering template editor');
    return <TemplateEditor template={template} onSave={this.saveTemplate} />;
  }

  renderArchive(completedQuestionnaires) {
    console.log('Rendering archive');
    return (
      <Archive
        questionnaires={completedQuestionnaires}
        onOpen={this.openQuestionnaire}
      />
    );
  }

  renderNavigation(openQuestionnaires) {
    console.log('Rendering navigation');
    return (
      <Navigation
        onOpenQuestionnaire={this.openQuestionnaire}
        onCreateQuestionnaire={this.createQuestionnaire}
        onOpenTemplate={this.openTemplate}
        onOpenArchive={this.openArchive}
        openQuestionnaires={openQuestionnaires}
      />
    );
  }
}

import React from 'react';
import './Applicant.css';
import Navigation from './navigation/Navigation';
import navigationKeys from './navigation/navigation-keys';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Archive from './archive/Archive';
import Questionnaire from '../models/questionnaire';
import Template from '../models/template';
import TemplateView from './template-editor/TemplateView';
import QuestionnaireView from './questionnaire/QuestionnaireView';

export default class Applicant extends React.Component {
  constructor(props) {
    super(props);

    if (!props.templateRepository) {
      throw new Error('templateRepository must be given.');
    }
    if (!props.questionnaireRepository) {
      throw new Error('questionnaireRepository must be given');
    }

    this.state = {
      renderKey: navigationKeys.navigation,
      selectedQuestionnaire: null,
    };

    this.openNavigation = this.openNavigation.bind(this);
    this.openQuestionnaire = this.openQuestionnaire.bind(this);
    this.createQuestionnaire = this.createQuestionnaire.bind(this);
    this.openTemplate = this.openTemplate.bind(this);
    this.openArchive = this.openArchive.bind(this);
  }

  get templateRepository() {
    return this.props.templateRepository;
  }

  get questionnaireRepository() {
    return this.props.questionnaireRepository;
  }

  get applicationTitle() {
    return this.props.title ?? 'Applicant';
  }

  render() {
    const pageTitle = this.applicationTitle;
    const element = this.renderActiveElement();
    return (
      <div className='applicant'>
        <Header>{pageTitle}</Header>
        <main>{element}</main>
        <Footer onClick={this.openNavigation} />
      </div>
    );
  }

  renderActiveElement() {
    const key = this.state.renderKey;
    console.log(`Rendering ${key} view`);
    switch (key) {
      case navigationKeys.questionnaire:
        return this.renderQuestionnaire();
      case navigationKeys.template:
        return this.renderTemplate();
      case navigationKeys.archive:
        return this.renderArchive();
      default:
        return this.renderNavigation();
    }
  }

  renderQuestionnaire() {
    console.log('Rendering questionnaire');
    console.log(this.questionnaireRepository);
    return (
      <QuestionnaireView
        questionnaire={this.state.selectedQuestionnaire}
        questionnaireRepository={this.questionnaireRepository}
      />
    );
  }

  renderTemplate() {
    console.log('Rendering template');
    const hasTemplate = this.templateRepository.hasTemplate();
    const template = hasTemplate
      ? this.templateRepository.getTemplate()
      : Template.create();
    return (
      <TemplateView
        template={template}
        templateRepository={this.templateRepository}
      />
    );
  }

  renderArchive() {
    console.log('Rendering archive');
    const repository = this.questionnaireRepository;
    const questionnaires = repository.getCompleted();
    return (
      <Archive
        questionnaires={questionnaires}
        onOpen={this.openQuestionnaire}
      />
    );
  }

  renderNavigation() {
    console.log('Rendering navigation');
    const repository = this.questionnaireRepository;
    const openQuestionnaires = repository.getActive();
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

  openNavigation() {
    console.log('open navigation');
    this.setState({
      renderKey: navigationKeys.navigation,
      selectedQuestionnaire: null,
    });
  }

  openQuestionnaire(questionnaire) {
    console.log('open questionnaire');
    this.setState({
      renderKey: navigationKeys.questionnaire,
      selectedQuestionnaire: questionnaire,
    });
  }

  createQuestionnaire(title) {
    console.log('creating questionnaire');
    const repository = this.templateRepository;
    const template = repository.getTemplate();
    const newQuestionnaire = Questionnaire.create(template, title);
    this.openQuestionnaire(newQuestionnaire);
  }

  openArchive() {
    console.log('opening archive');
    this.setState({
      renderKey: navigationKeys.archive,
      selectedQuestionnaire: null,
    });
  }

  openTemplate() {
    console.log('open template');
    this.setState({
      renderKey: navigationKeys.template,
      selectedQuestionnaire: null,
    });
  }
}

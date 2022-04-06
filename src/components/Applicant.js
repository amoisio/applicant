import React from 'react';
import './Applicant.css';
import Navigation from './navigation/Navigation';
import navigationKeys from './navigation/navigation-keys';
import TemplateEditor from './template-editor/TemplateEditor';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Archive from './archive/Archive';
import Questionnaire from '../models/questionnaire';
import Template from '../models/template';
import QuestionnaireEditor from './questionnaire/QuestionnaireEditor';

export default class Applicant extends React.Component {
  constructor(props) {
    super(props);

    const templateRepository = props.templateRepository;
    if (!templateRepository) {
      throw new Error('templateRepository must be given.');
    }
    const questionnaireRepository = props.questionnaireRepository;
    if (questionnaireRepository) {
      throw new Error('questionnaireRepository must be given');
    }

    this.state = {
      title: 'Applicant',
      renderKey: navigationKeys.navigation,
      selectedQuestionnaire: null,
      template: templateRepository.getTemplate(),
      openQuestionnaires: questionnaireRepository.getActive(),
      completedQuestionnaires: questionnaireRepository.getCompleted(),
    };

    this.openNavigation = this.openNavigation.bind(this);

    this.createQuestionnaire = this.createQuestionnaire.bind(this);
    this.openQuestionnaire = this.openQuestionnaire.bind(this);
    this.saveQuestionnaire = this.saveQuestionnaire.bind(this);
    this.completeQuestionnaire = this.completeQuestionnaire.bind(this);

    this.openTemplate = this.openTemplate.bind(this);

    this.openArchive = this.openArchive.bind(this);
  }

  render() {
    const pageTitle = this.state.title;
    const element = this.renderActiveElement();
    return (
      <div className='applicant'>
        <Header>{pageTitle}</Header>
        <main>{element}</main>
        <Footer onClick={this.openNavigation} />
      </div>
    );
  }

  openNavigation() {
    console.log('open navigation');
    this.setState({
      renderKey: navigationKeys.navigation,
      selectedQuestionnaire: null,
    });
  }

  renderActiveElement(key) {
    const key = this.state.renderKey;
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
    const questionnaire = this.state.selectedQuestionnaire;
    return (
      <QuestionnaireEditor
        questionnaire={questionnaire}
        onAnswer={this.updateAnswer}
        onComplete={this.completeQuestionnaire}
      />
    );
  }

  updateAnswer(id, modifiedAnswer) {
    const questionnaire = this.state.selectedQuestionnaire;
    const modifiedQuestionnaire = Questionnaire.answer(
      id,
      modifiedAnswer,
      questionnaire
    );
    this.saveQuestionnaire(modifiedQuestionnaire);
  }

  completeQuestionnaire() {
    const questionnaire = this.state.selectedQuestionnaire;
    const modifiedQuestionnaire = Questionnaire.complete(questionnaire);
    this.saveQuestionnaire(modifiedQuestionnaire);
  }

  saveQuestionnaire(questionnaire) {
    QuestionnaireRepository.addOrUpdate(questionnaire);
    this.setState({
      selectedQuestionnaire: questionnaire,
      openQuestionnaires: QuestionnaireRepository.getActive(),
      completedQuestionnaires: QuestionnaireRepository.getCompleted(),
    });
  }

  renderTemplate() {
    console.log('Rendering template editor');
    const template = this.state.template;
    return (
      <TemplateEditor
        template={template}
        onAdd={this.addQuestion}
        onChange={this.updateQuestion}
        onRemove={this.removeQuestion}
      />
    );
  }

  addQuestion(text) {
    const template = this.state.template;
    const modifiedTemplate = Template.addQuestion(text, template);
    this.saveTemplate(modifiedTemplate);
  }

  updateQuestion(id, modifiedText) {
    const template = this.state.template;
    const modifiedTemplate = Template.changeQuestionText(
      id,
      modifiedText,
      template
    );
    this.saveTemplate(modifiedTemplate);
  }

  removeQuestion(id) {
    const template = this.state.template;
    const modifiedTemplate = Template.removeQuestion(id, template);
    this.saveTemplate(modifiedTemplate);
  }

  saveTemplate(template) {
    console.log('save template');
    TemplateRepository.addOrUpdate(template);
    this.setState({
      template: template,
    });
  }

  renderArchive() {
    console.log('Rendering archive');
    const completedQuestionnaires = this.state.completedQuestionnaires;
    return (
      <Archive
        questionnaires={completedQuestionnaires}
        onOpen={this.openQuestionnaire}
      />
    );
  }

  renderNavigation() {
    console.log('Rendering navigation');
    const openQuestionnaires = this.state.openQuestionnaires;
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

  openQuestionnaire(questionnaire) {
    console.log('open questionnaire');
    this.setState({
      renderKey: navigationKeys.questionnaire,
      selectedQuestionnaire: questionnaire,
    });
  }

  createQuestionnaire(title) {
    console.log('Creating questionnaire');
    const template = this.state.template;
    const newQuestionnaire = Questionnaire.create(template, title);
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

  openTemplate() {
    console.log('open template');
    this.setState({
      renderKey: navigationKeys.template,
    });
  }
}

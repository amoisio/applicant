import React from 'react';
import Template from '../../models/template';
import TemplateEditor from './TemplateEditor';
import ViewTitle from '../shared/ViewTitle';
import './TemplateView.css';

/**
 * Template view component manages template state.
 * @param {object} template Template.
 * @param {object} templateRepository Template repository.
 */
export default class TemplateView extends React.Component {
  constructor(props) {
    super(props);
  
    const template = props.template;
    if (!template) {
      throw new Error('template must be given.');
    }
    const templateRepository = props.templateRepository;
    if (!templateRepository) {
      throw new Error('templateRepository must be given.');
    }

    this.state = {
      template: template
    }

    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.reorderQuestion = this.reorderQuestion.bind(this);
  }

  get templateRepository() {
    return this.props.templateRepository;
  }

  render() {
    console.log('Rendering template editor');
    const template = this.state.template;
    return (
      <main className='template'>
        <ViewTitle>Template questions</ViewTitle>
        <TemplateEditor
          template={template}
          onAdd={this.addQuestion}
          onChange={this.updateQuestion}
          onRemove={this.removeQuestion}
          onReorder={this.reorderQuestion}
        />
      </main>
    );
  }

  addQuestion(text) {
    const template = this.state.template;
    const modifiedTemplate = Template.addQuestion(text, template);
    this.save(modifiedTemplate);
  }

  updateQuestion(id, modifiedText) {
    const template = this.state.template;
    const modifiedTemplate = Template.changeQuestionText(
      id,
      modifiedText,
      template
    );
    this.save(modifiedTemplate);
  }

  removeQuestion(id) {
    const template = this.state.template;
    const modifiedTemplate = Template.removeQuestion(id, template);
    this.save(modifiedTemplate);
  }

  reorderQuestion(id, newIndex) {
    const template = this.state.template;
    const modifiedTemplate = Template.reorderQuestion(id, newIndex, template);
    this.save(modifiedTemplate);
  }

  save(template) {
    console.log('save template');
    this.templateRepository.addOrUpdateTemplate(template);
    this.setState({
      template: template,
    });
  }
}

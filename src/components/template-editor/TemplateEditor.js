import React from 'react';
import ViewTitle from '../shared/ViewTitle';
import TemplateQuestion from './TemplateQuestion';
import NewTemplateQuestion from './NewTemplateQuestion';
import Template from '../../models/template';

// TODO: Add reordering capability
/**
 * Template editor component
 * @param {object} template Template
 * @param {function} onSave onSave(template: object) callback function for persisting template changes.
 */
export default class TemplateEditor extends React.Component {

  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
  }

  get template() {
    return this.props.template;
  }

  get onSave() {
    return this.props.onSave ?? (() => console.error('onSave callback not defined.'));
  }

  addQuestion(text) {
    const template = this.template;
    const modifiedTemplate = Template.addQuestion(text, template);
    this.onSave(modifiedTemplate);
  }

  updateQuestion(id, modifiedText) {
    const template = this.template;
    const modifiedTemplate = Template.changeQuestionText(id, modifiedText, template)
    this.onSave(modifiedTemplate);
  }

  removeQuestion(id) {
    const template = this.template;
    const modifiedTemplate = Template.removeQuestion(id, template);
    this.onSave(modifiedTemplate);
  }

  render() {
    const template = this.template;
    const questions = template.questions.map((question) => {
      return (
        <TemplateQuestion
          key={question.id}
          question={question.text}
          onChange={(modifiedText) => this.updateQuestion(question.id, modifiedText)}
          onRemove={() => this.removeQuestion(question.id)}
        />
      );
    });

    return (
      <div id='template-editor'>
        <ViewTitle>Template</ViewTitle>
        {questions}
        <NewTemplateQuestion onAdd={this.addQuestion} />
      </div>
    );
  }
}

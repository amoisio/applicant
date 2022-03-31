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

  addQuestion(text) {
    const template = this.props.template;
    const modifiedTemplate = Template.addQuestion(text, template);
    this.props.onSave(modifiedTemplate);
  }

  updateQuestion(id, modifiedText) {
    const template = this.props.template;
    const modifiedTemplate = Template.changeQuestionText(id, modifiedText, template)
    this.props.onSave(modifiedTemplate);
  }

  removeQuestion(id) {
    const template = this.props.template;
    const modifiedTemplate = Template.removeQuestion(id, template);
    this.props.onSave(modifiedTemplate);
  }

  render() {
    const template = this.props.template;
    const questions = template.questions.map((question) => {
      return (
        <TemplateQuestion
          key={question.id}
          id={question.id}
          question={question.text}
          onChange={this.updateQuestion}
          onRemove={this.removeQuestion}
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

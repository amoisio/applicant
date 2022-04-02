import React from 'react';
import QuestionWithAnswer from './QuestionWithAnswer';
import ViewTitle from '../shared/ViewTitle';

export default class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
  }



  get title() {
    return this.props.questionnaire.title;
  }

  get questions() {
    return this.props.questionnaire.questions;
  }

  addQuestion(text) {
    const template = this.props.template;
    const modifiedTemplate = Template.addQuestion(text, template);
    this.props.onSave(modifiedTemplate);
  }

  updateQuestion(id, modifiedText) {
    const template = this.props.template;
    const modifiedTemplate = Template.changeQuestionText(
      id,
      modifiedText,
      template
    );
    this.props.onSave(modifiedTemplate);
  }

  removeQuestion(id) {
    const template = this.props.template;
    const modifiedTemplate = Template.removeQuestion(id, template);
    this.props.onSave(modifiedTemplate);
  }

  render() {
    const questions = this.questions.map((question) => {
      return (
        <QuestionWithAnswer
          key={question.id}
          id={question.id}
          question={question.text}
          onChange={this.updateQuestion}
        />
      );
    });

    return (
      <div id='questionnaire'>
        <ViewTitle>{this.title}</ViewTitle>
        {questions}
      </div>
    );
  }
}

import React from 'react';
import QuestionWithAnswer from './QuestionWithAnswer';
import ViewTitle from '../shared/ViewTitle';
import Questionnaire from '../../models/questionnaire';

/**
 * 
 */
export default class QuestionnaireEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.completeQuestionnaire = this.completeQuestionnaire.bind(this);
  }

  get questionnaire() {
    return this.props.questionnaire;
  }

  get title() {
    return this.props.questionnaire.title;
  }

  get questions() {
    return this.props.questionnaire.questions;
  }

  get onSave() {
    return this.props.onSave;
  }

  updateAnswer(id, modifiedAnswer) {
    const questionnaire = this.questionnaire;
    const modifiedQuestionnaire = Questionnaire.answer(id, modifiedAnswer, questionnaire);
    this.onSave(modifiedQuestionnaire);
  }

  completeQuestionnaire() {
    const questionnaire = this.questionnaire;
    const modifiedQuestionnaire = Questionnaire.complete(questionnaire);
    this.onSave(modifiedQuestionnaire);
  }

  render() {
    const questions = this.questions.map((question) => {
      return (
        <QuestionWithAnswer
          key={question.id}
          question={question.text}
          answer={question.answer}
          onChange={(modifiedAnswer) =>
            this.updateAnswer(question.id, modifiedAnswer)
          }
        />
      );
    });

    return (
      <div id='questionnaire'>
        <ViewTitle>{this.title}</ViewTitle>
        {questions}
        <Button onClick={this.completeQuestionnaire}>Complete</Button>
      </div>
    );
  }
}

import React from 'react';
import Questionnaire from '../../models/questionnaire';
import QuestionnaireEditor from './QuestionnaireEditor';

/**
 * Template view component manages template state.
 * @param {object} questionnaire Questionnaire.
 * @param {object} questionnaireRepository Questionnaire repository.
 */
export default class QuestionnaireView extends React.Component {
  constructor(props) {
    super(props);

    const questionnaire = props.questionnaire;
    if (!questionnaire) {
      throw new Error('questionnaire must be given.');
    }
    const questionnaireRepository = props.questionnaireRepository;
    if (!questionnaireRepository) {
      throw new Error('questionnaireRepository must be given');
    }
    this.state = {
      questionnaire: questionnaire,
    };

    this.updateAnswer = this.updateAnswer.bind(this);
    this.completeQuestionnaire = this.completeQuestionnaire.bind(this);
  }

  get questionnaireRepository() {
    return this.props.questionnaireRepository;
  }

  get questionnaire() {
    return this.props.questionnaire;
  }

  render() {
    console.log('Rendering questionnaire');
    const questionnaire = this.state.questionnaire;
    return (
      <QuestionnaireEditor
        questionnaire={questionnaire}
        onAnswer={this.updateAnswer}
        onComplete={this.completeQuestionnaire}
      />
    );
  }

  updateAnswer(id, modifiedAnswer) {
    const questionnaire = this.state.questionnaire;
    const modifiedQuestionnaire = Questionnaire.answer(
      id,
      modifiedAnswer,
      questionnaire
    );
    this.save(modifiedQuestionnaire);
  }

  completeQuestionnaire() {
    const questionnaire = this.state.questionnaire;
    const modifiedQuestionnaire = Questionnaire.complete(questionnaire);
    this.save(modifiedQuestionnaire);
  }

  save(questionnaire) {
    this.questionnaireRepository.addOrUpdate(questionnaire);
    this.setState({
      questionnaire: questionnaire,
    });
  }
}

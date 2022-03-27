import React from 'react';
import { service as TemplateService } from '../../services/template-service';
import ViewTitle from '../shared/ViewTitle';
import Question from './Question';

export default class TemplateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: TemplateService.getQuestions()
    }

    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  save(question, newValue) {
    const questions = this.state.questions;
    const index = questions.findIndex((q) => q.id === question.id);
    if (question === undefined) {
      questions.push(new Question(newValue));
    } else {
      questions[index].text = newValue;
    }
    this.setState({
      questions: questions
    });
    TemplateService.setQuestions(questions);
  }

  remove(question, e) {
    console.log('remove');
    const questions = this.state.questions;
    const index = questions.findIndex((q) => q.id === question.id);
    if (index === -1) {
      return;
    } 
    questions.splice(index, 1);
    this.setState({
      questions: questions
    });
    TemplateService.setQuestions(questions);
  }

  render() {
    const questions = this.state.questions;
    const elements = [];
    for (const question of questions) {
      elements.push(
        <Question
          key={question.id}
          question={question}
          onChange={(newValue) => this.save(question, newValue)}
          onRemove={this.remove}
        />
      );
    }
    return (
      <div id='template-editor'>
        <ViewTitle>Template</ViewTitle>
        {elements}
      </div>
    );
  }
}

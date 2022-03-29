import React from 'react';
import { service as TemplateService } from '../../services/template-repository';
import ViewTitle from '../shared/ViewTitle';
import Question from './Question';
import { Map } from 'immutable';
import { Question as createQuestion } from '../../models/question';

export default class TemplateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: TemplateService.get()
    }

    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  save(id, newValue) {
    const newQuestion = createQuestion(id, newValue);
    const updatedTemplate = this.updateTemplate(this.state.template, newQuestion);
    this.saveTemplate(updatedTemplate);
  }

  saveTemplate(template) {
    this.setState({
      template: template
    });
    TemplateService.save(template);
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
    const template = this.state.template;
    const elements = template.questions.map(question => {
      return <Question
        key={question.id}
        question={question}
        onChange={(newValue) => this.save(question, newValue)}
        onRemove={this.remove}
      />;
    });

    return (
      <div id='template-editor'>
        <ViewTitle>Template</ViewTitle>
        {elements}
      </div>
    );
  }
}

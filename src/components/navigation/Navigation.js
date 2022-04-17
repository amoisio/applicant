import React from 'react';
import Button from '../shared/Button';

/**
 * Landing page navigation component.
 * @param {any[]} openQuestionnaires Open questionnaires.
 * @param {function} onOpenQuestionnaire onOpenQuestionnaire(id: string) callback called when clicking on the questionnaire's button.
 * @param {function} onCreateQuestionnaire onCreateQuestionnaire(title: string) callback called when clicking on the 'New' button.
 * @param {function} onOpenTemplate onOpenTemplate() callback called when clicking on the 'Template' button.
 * @param {function} onOpenArchive onOpenArchive() callback called when clicking on the 'Archive' button.
 */
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaireTitle: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(title) {
    this.setState({
      questionnaireTitle: title
    });
  }

  render() {
    const questionnaires = this.props.openQuestionnaires.map((q) => {
      return (
        <Button 
          key={q.id}
          onClick={() => this.props.onOpenQuestionnaire(q)}>
          {q.title}
        </Button>
      );
    });
    return (
      <main class="navigation">
        {questionnaires}
        <input
          type='text'
          placeholder='Questionnaire title...'
          onChange={(e) => this.onChange(e.target.value)}
          value={this.state.questionnaireTitle}
        ></input>
        <Button
          onClick={() =>
            this.props.onCreateQuestionnaire(this.state.questionnaireTitle)
          }
        >
          New
        </Button>
        <Button onClick={this.props.onOpenTemplate}>Template</Button>
        <Button onClick={this.props.onOpenArchive}>Archive</Button>
      </main>
    );
  }
}

import React from 'react';
import './Navigation.css';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import NavLink from '../shared/NavLink';
import InputText from '../shared/InputText';
import { trimmedOrDefault } from '../../models/common';
/**
 * Landing page navigation component.
 * @param {any[]} openQuestionnaires Open questionnaires.
 * @param {function} onOpenQuestionnaire onOpenQuestionnaire(id: string) callback called when clicking on the questionnaire's button.
 * @param {function} onCreateQuestionnaire onCreateQuestionnaire(title: string) callback called when clicking on the 'New' button.
 * @param {function} onOpenTemplate onOpenTemplate() callback called when clicking on the 'Template' button.
 * @param {function} onOpenArchive onOpenArchive() callback called when clicking on the 'Archive' button.
 */
export default class NavigationView extends React.Component {
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
      var total = q.questions.length;
      var answered = q.questions.map((q) => trimmedOrDefault(q.answer)).filter(a => a !== null).length;
      return (
        <div className='nav-link-with-count' key={q.id}>
          <NavLink onClick={() => this.props.onOpenQuestionnaire(q)}>
            {q.title}
            <Icon icon='chevron-right' />
          </NavLink>
          <span className='count'>
            {answered} / {total}
          </span>
        </div>
      );
    });
    return (
      <main className='navigation'>
        <div className='new-questionnaire'>
          <InputText
            placeholder='New questionnaire title...'
            onChange={this.onChange}
            value={this.state.questionnaireTitle}
          />
          <Button
            onClick={() =>
              this.props.onCreateQuestionnaire(this.state.questionnaireTitle)
            }
            className='action-button'
          >
            <Icon icon='plus-lg' />
          </Button>
        </div>
        {questionnaires}
      </main>
    );
  }
}
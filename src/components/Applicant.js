import React from 'react';
import './Applicant.css';
import Navigation from './main-page/Navigation';
import Questionnaire from './questionnaire/Questionnaire';
import TemplateEditor from './template-editor/TemplateEditor';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Archive from './archive/Archive';

export default class Applicant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Applicant',
      renderKey: 'navigation',
      renderId: null,
    };

    // This binding is necessary to make `this` work in the callback
    this.navigate = this.navigate.bind(this);
  }

  navigate(renderKey, id, event) {
    this.setState({
      renderKey: renderKey,
      renderId: id
    });
  }

  render() {
    let element;
    if (this.state.renderKey === 'navigation') {
      element = <Navigation onClick={this.navigate} />;
    } else if (this.state.renderKey === 'questionnaire') {
      element = <Questionnaire title={'Continue ' + this.state.renderId}/>;
    } else if (this.state.renderKey === 'template') {
      element = <TemplateEditor title='Edit template'/>;
    } else if (this.state.renderKey === 'archive') {
      element = <Archive title='Archive' />;
    } else {
      element = <p>Unsupported renderKey {this.state.renderKey}</p>
    }
    return (
      <div className='applicant'>
        <Header>{this.state.title}</Header>
        <main>
          {element}
        </main>
        <Footer onClick={() => this.navigate('navigation')}/>
      </div>
    );
  }
}

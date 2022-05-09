import { screen } from '@testing-library/react';
import { render } from '../test-utilities/render';
import TemplateRepository from '../test-utilities/template-repository';
import QuestionnaireRepository from '../test-utilities/questionnaire-repository';
import Applicant from './Applicant';

describe('Applicant main page', () => {
  const title = 'Applicant title';
  let element;
  beforeAll(() => {
    element = (
      <Applicant
        title={title}
        templateRepository={TemplateRepository}
        questionnaireRepository={QuestionnaireRepository}
      />
    );
  });

  it('should render application title', () => {
    render(element);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should show a menu link', () => {
    render(element);

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('should show a template link', () => {
    render(element);

    expect(screen.getByText('Template')).toBeInTheDocument();
  });

  it('should show an archive link', () => {
    render(element);

    expect(screen.getByText('Archive')).toBeInTheDocument();
  });

  it('should show a textbox with a placeholder for entering a new questionnaire title', () => {
    render(element);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/New questionnaire title/)
    ).toBeInTheDocument();
  });
});

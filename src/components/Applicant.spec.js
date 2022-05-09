import { screen } from '@testing-library/react';
import { render } from '../test-utilities/render';
import createTemplateRepository from '../test-utilities/template-repository';
import createQuestionnaireRepository from '../test-utilities/questionnaire-repository';
import Applicant from './Applicant';

describe('Applicant main page', () => {
  const title = 'Applicant title';
  let element;
  beforeAll(() => {
    const templateRepository = createTemplateRepository();
    const questionnaireRepository = createQuestionnaireRepository();
    element = (
      <Applicant
        title={title}
        templateRepository={templateRepository}
        questionnaireRepository={questionnaireRepository}
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
});

import { screen } from '@testing-library/react';
import { render } from '../../test-utilities/render';
import createTemplateRepository from '../../test-utilities/template-repository';
import createQuestionnaireRepository from '../../test-utilities/questionnaire-repository';
import DataApi from '../../test-utilities/test-data';
import NavigationView from './NavigationView';

describe('Navigation page', () => {
  let element;
  beforeAll(() => {
    const templateRepository = createTemplateRepository();
    const template = DataApi.createTemplate(
      'First question',
      'Second question',
      'Third question'
    );
    templateRepository.addOrUpdateTemplate(template);

    const questionnaireRepository = createQuestionnaireRepository();
    const questionnaire1 = DataApi.createQuestionnaire(
      template,
      'Empty',
      [],
      false
    );
    questionnaireRepository.addOrUpdate(questionnaire1);
    const questionnaire2 = DataApi.createQuestionnaire(
      template,
      'Partially filled',
      ['First answer'],
      false
    );
    questionnaireRepository.addOrUpdate(questionnaire2);
    const questionnaire3 = DataApi.createQuestionnaire(
      template,
      'Completed',
      ['First answer', 'Second answer', 'Third answer'],
      true
    );
    questionnaireRepository.addOrUpdate(questionnaire3);

    element = (
      <NavigationView
        templateRepository={templateRepository}
        questionnaireRepository={questionnaireRepository}
      />
    );
  });

  it('should show a textbox with a placeholder for entering a new questionnaire title', () => {
    render(element);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/New questionnaire title/)
    ).toBeInTheDocument();
  });

  it('should show a "Start new questionnaire" button', () => {
    expect(false).toBeTruthy();
  });

  describe('"Start new questionnaire button', () => {
    it('should navigate to the Questionnaire page of the new questionnaire when clicked', () => {
      expect(false).toBeTruthy();
    });

    it('should display an error "Questionnaire title is required" when clicked without giving a questionnaire title', () => {
      expect(false).toBeTruthy();
    });
  });

  describe('Open questionnaires list', () => {
    it('should show two questionnaire links - "Empty" and "Partially filled"', () => {
      expect(false).toBeTruthy();
    });

    it('should navigate to the Questionnaire page when link clicked', () => {
      expect(false).toBeTruthy();
    });
  });
});

import { screen } from '@testing-library/react';
import { render } from '../../test-utilities/render';
import createTemplateRepository from '../../test-utilities/template-repository';
import DataApi from '../../test-utilities/test-data';
import TemplateView from './TemplateView';

describe('Template page', () => {
  let element;
  beforeAll(() => {
    const templateRepository = createTemplateRepository();
    const template = DataApi.createTemplate(
      'First question',
      'Second question',
      'Third question'
    );
    templateRepository.addOrUpdateTemplate(template);

    element = <TemplateView title='Template' repository={templateRepository} />;
  });

  it('should show the template page title', () => {
    render(element);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/New questionnaire title/)
    ).toBeInTheDocument();
  });

  it('should show a component for adding new questions to the template', () => {
    expect(false).toBeTruthy();
  });

  describe('"Add new questions" component', () => {
    it('should show a textbox for entering new question text', () => {
      expect(false).toBeTruthy();
    });

    it('should show a button for adding the new question to the template', () => {
      expect(false).toBeTruthy();
    });

    it('should add the new question to the list of questions when button is clicked', () => {
      expect(false).toBeTruthy();
    });
  });

  it('should show a list of template questions components', () => {
    expect(false).toBeTruthy();
  });

  describe('Template question component', () => {
    it('should show a textbox for editing the question text', () => {
      expect(false).toBeTruthy();
    });

    it('should automatically persist the question text when editing the question text', () => {
      it('should show a textbox for entering new question text', () => {
        expect(false).toBeTruthy();
      });

      it('should show a button for adding the new question to the template', () => {
        expect(false).toBeTruthy();
      });

      it('should add the new question to the list of question when button is clicked', () => {
        expect(false).toBeTruthy();
      });
    });

    it('should show a button for deleting the question from the template', () => {
      expect(false).toBeTruthy();
    });

    it('should remove the question from the list of questions when button is clicked', () => {
      expect(false).toBeTruthy();
    });
  });
});

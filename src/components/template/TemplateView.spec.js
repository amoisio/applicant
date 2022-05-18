import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test-utilities/render';
import createTemplateRepository from '../../test-utilities/template-repository';
import DataApi from '../../test-utilities/test-data';
import TemplateView from './TemplateView';

describe('Template page', () => {
  let element;
  beforeAll(() => {
    const templateRepository = createTemplateRepository();
    const template = DataApi.createTemplate('First question', 'Second question', 'Third question');
    templateRepository.addOrUpdateTemplate(template);

    element = <TemplateView title='Template' repository={templateRepository} />;
  });

  beforeEach(() => {
    render(element);
  });

  it('should show the template page title', () => {
    const title = screen.getByText(/Template/);
    expect(title).toBeInTheDocument();
  });

  it('should show a textbox for entering new question text', () => {
    const newQuestionInput = screen.getByPlaceholderText(/Enter new question/);
    expect(newQuestionInput).toBeInTheDocument();
  });

  it('should show a button for adding the new question to the template', () => {
    const addQuestionButton = screen.getByRole('button', { name: /add-question/ });
    expect(addQuestionButton).toBeInTheDocument();
  });

  it('should add the new question to the list of questions when add-question button is clicked', async () => {
    const newQuestionText = 'This is a new question';
    const input = screen.getByPlaceholderText(/Enter new question/);
    const button = screen.getByRole('button', { name: /add-question/ });
    await fireEvent.change(input, { target: { value: newQuestionText } });

    await fireEvent.click(button);

    const questionInput = screen.getByText(newQuestionText);
    expect(questionInput).toBeInTheDocument();
  });

  it('should show template questions', () => {
    const firstQuestion = screen.getByText('First question');
    const secondQuestion = screen.getByText('Second question');
    const thirdQuestion = screen.getByText('Third question');

    expect(firstQuestion).toBeInTheDocument();
    expect(secondQuestion).toBeInTheDocument();
    expect(thirdQuestion).toBeInTheDocument();
  });

  it('should allow question text to be edited', async () => {
    const firstQuestion = screen.getByText('First question');

    await fireEvent.change(firstQuestion, { target: { value: 'Really first question'} });

    const editedQuestion = screen.getByText('Really first question');
    expect(editedQuestion).toBeInTheDocument();
  });

  it('should show buttons for deleting questions from the template', () => {
    const removeQuestionButtons = screen.getAllByRole('button', { name: /remove-question/ });
    
    expect(removeQuestionButtons.length).toBeGreaterThan(0);
  });

  it('should remove the question from the list of questions when button is clicked', async () => {
    const removeButtons = screen.getAllByRole('button', { name: /remove-question/ });
    const count = removeButtons.length;

    await fireEvent.click(removeButtons[0]);

    const newRemoveButtons = screen.getAllByRole('button', { name: /remove-question/ });
    const newCount = newRemoveButtons.length;
    expect(newCount).toBe(count - 1);
  });
});

import Template from './template';
import Question from './question';

describe('Template', () => {
  it('should construct with no questions', () => {
    const template = Template.create('my-id', []);

    expect(template.id).toBe('my-id');
    expect(template.questions.length).toBe(0);
  });

  it('should construct with one question', () => {
    const question1 = Question.create('1', 'q');

    const template = Template.create('my-id', question1);

    expect(template.id).toBe('my-id');
    expect(template.questions.length).toBe(1);
    expect(template.questions).toContainEqual(question1);
  });

  it('should construct with multiple questions', () => {
    const question1 = Question.create('1', 'q');
    const question2 = Question.create('2', 'dd');

    const template = Template.create('my-id', [question1, question2]);

    expect(template.id).toBe('my-id');
    expect(template.questions.length).toBe(2);
    expect(template.questions).toContainEqual(question1);
    expect(template.questions).toContainEqual(question2);
  });

  it('should return a new template with the added question', () => {
    const question1 = Question.create('1', 'q');
    const template = Template.create('my-q', question1);

    const question2 = Question.create('2', 'dd');
    const updatedTemplate = Template.addQuestion(question2, template);

    expect(template.questions.length).toBe(1);
    expect(updatedTemplate.questions.length).toBe(2);
    expect(updatedTemplate.questions).toContainEqual(question2);
  });

  it('should return a new template without the removed question', () => {
    const question1 = Question.create('1', 'q');
    const question2 = Question.create('2', 'dd');
    const template = Template.create('my-q', [question1, question2]);

    const updatedTemplate = Template.removeQuestion(question2, template);

    expect(updatedTemplate.questions.length).toBe(1);
    expect(updatedTemplate.questions).toContainEqual(question1);
    expect(template.questions.length).toBe(2);
    expect(template.questions).toContainEqual(question1);
    expect(template.questions).toContainEqual(question2);
  });
});

import Template from './template';
import TemplateQuestion from './template-question';

describe('Template.create', () => {
  it('should construct template correctly without providing a question array', () => {
    const template = Template.create();

    expect(template.id).not.toBeNull();
    expect(template.questions.length).toBe(0);
  });

  it('should construct template correctly when provided with an empty question array', () => {
    const template = Template.create([]);

    expect(template.id).not.toBeNull();
    expect(template.questions.length).toBe(0);
  });

  it('should construct template correctly with a single question', () => {
    const question1 = TemplateQuestion.create('question1', '1');

    const template = Template.create(question1, 'my-id');

    expect(template.id).toBe('my-id');
    expect(template.questions.length).toBe(1);
    expect(template.questions).toContainEqual(question1);
  });

  it('should construct template correctly with multiple questions', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const question2 = TemplateQuestion.create('question2', '2'  );

    const template = Template.create([question1, question2], 'my-id');

    expect(template.id).toBe('my-id');
    expect(template.questions.length).toBe(2);
    expect(template.questions).toContainEqual(question1);
    expect(template.questions).toContainEqual(question2);
  });
});

describe('Template.addQuestion', () => {
  it('should add a question to a copy of a template', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const template = Template.create(question1, 'my-q');

    const updatedTemplate = Template.addQuestion('new question', template);

    expect(updatedTemplate.questions.length).toBe(2);
    expect(updatedTemplate.questions[1].text).toBe('new question');
  });

  it('should not add the question to the provided template', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const template = Template.create(question1, 'my-q');

    Template.addQuestion('new question', template);

    expect(template.questions.length).toBe(1);
  });
});

describe('Template.removeQuestion', () => {
  it('should remove a question from a copy of a template', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const question2 = TemplateQuestion.create('question2', '2');
    const template = Template.create([question1, question2], 'my-q');

    const updatedTemplate = Template.removeQuestion('2', template);

    expect(updatedTemplate.questions.length).toBe(1);
    expect(updatedTemplate.questions).toContainEqual(question1);
    expect(updatedTemplate.questions).not.toContainEqual(question2);
  });

  it('should not remove the question from the provided template', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const question2 = TemplateQuestion.create('question2', '2');
    const template = Template.create([question1, question2], 'my-q');

    Template.removeQuestion('2', template);

    expect(template.questions.length).toBe(2);
    expect(template.questions).toContainEqual(question1);
    expect(template.questions).toContainEqual(question2);
  });
});

describe('Template.reorderQuestion', () => {
  it('should reorder the questions of a copied template', () => {
    const question1 = TemplateQuestion.create('first', '1');
    const question2 = TemplateQuestion.create('second', '2');
    const question3 = TemplateQuestion.create('third', '3');
    const template = Template.create([question1, question2, question3], 'my-q');

    const updatedTemplate = Template.reorderQuestion('3', 1, template);

    expect(updatedTemplate.questions.length).toBe(3);
    expect(updatedTemplate.questions[0]).toEqual(question1);
    expect(updatedTemplate.questions[1]).toEqual(question3);
    expect(updatedTemplate.questions[2]).toEqual(question2);
  });

  it('should place the question at the start of the question list when called with index 0', () => {
    const question1 = TemplateQuestion.create('first', '1');
    const question2 = TemplateQuestion.create('second', '2');
    const question3 = TemplateQuestion.create('third', '3');
    const template = Template.create([question1, question2, question3], 'my-q');

    const updatedTemplate = Template.reorderQuestion('3', 0, template);

    expect(updatedTemplate.questions.length).toBe(3);
    expect(updatedTemplate.questions[0]).toEqual(question3);
    expect(updatedTemplate.questions[1]).toEqual(question1);
    expect(updatedTemplate.questions[2]).toEqual(question2);
  });

  it('should place the question at the end of the question list when called with index -1', () => {
    const question1 = TemplateQuestion.create('first', '1');
    const question2 = TemplateQuestion.create('second', '2');
    const question3 = TemplateQuestion.create('third', '3');
    const template = Template.create([question1, question2, question3], 'my-q');

    const updatedTemplate = Template.reorderQuestion('1', -1, template);

    expect(updatedTemplate.questions.length).toBe(3);
    expect(updatedTemplate.questions[0]).toEqual(question2);
    expect(updatedTemplate.questions[1]).toEqual(question3);
    expect(updatedTemplate.questions[2]).toEqual(question1);
  });

  it('should place the question at the end of the question list when called with index greater than the size of the list', () => {
    const question1 = TemplateQuestion.create('first', '1');
    const question2 = TemplateQuestion.create('second', '2');
    const question3 = TemplateQuestion.create('third', '3');
    const template = Template.create([question1, question2, question3], 'my-q');

    const updatedTemplate = Template.reorderQuestion('1', 9000, template);

    expect(updatedTemplate.questions.length).toBe(3);
    expect(updatedTemplate.questions[0]).toEqual(question2);
    expect(updatedTemplate.questions[1]).toEqual(question3);
    expect(updatedTemplate.questions[2]).toEqual(question1);
  });

  it('should not alter the ordering of questions of the provided template', () => {
    const question1 = TemplateQuestion.create('first', '1');
    const question2 = TemplateQuestion.create('second', '2');
    const question3 = TemplateQuestion.create('third', '3');
    const template = Template.create([question1, question2, question3], 'my-q');

    Template.reorderQuestion('3', 1, template);

    expect(template.questions.length).toBe(3);
    expect(template.questions[0]).toEqual(question1);
    expect(template.questions[1]).toEqual(question2);
    expect(template.questions[2]).toEqual(question3);
  });
});

describe('Template.changeQuestionText', () => {
  it('should change the question text in a copy of a template', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const question2 = TemplateQuestion.create('question2', '2');
    const template = Template.create([question1, question2], 'my-q');

    const updatedTemplate = Template.changeQuestionText('2','changed text', template);

    expect(updatedTemplate.questions[1].text).toBe('changed text');
    expect(updatedTemplate.questions).not.toContainEqual(question2);
  });

  it('should not change the question text in the provided template', () => {
    const question1 = TemplateQuestion.create('question1', '1');
    const question2 = TemplateQuestion.create('question2', '2');
    const template = Template.create([question1, question2], 'my-q');

    Template.changeQuestionText('2', 'changed text', template);

    expect(template.questions[1].text).not.toBe('changed text');
    expect(template.questions).toContainEqual(question2);
  });
});

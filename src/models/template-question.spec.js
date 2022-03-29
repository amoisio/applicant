import TemplateQuestion from './template-question';

describe('TemplateQuestion', () => {
  it('should construct correctly with explicit id', () => {
    const question = TemplateQuestion.create('is this?', 'my-id');

    expect(question.id).toBe('my-id');
    expect(question.text).toBe('is this?');
  });

  it('should construct correctly without an id', () => {
    const question = TemplateQuestion.create('is this?');

    expect(question.id).not.toBeNull();
    expect(question.text).toBe('is this?');
  });

  it('should return an updated question with new text when calling changeText', () => {
    const question = TemplateQuestion.create('is this?', 'my-id');

    const updatedQuestion = TemplateQuestion.changeText('maybe?', question);

    expect(question.text).toBe('is this?');
    expect(updatedQuestion.text).toBe('maybe?');
  });
});

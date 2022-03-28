import Question from './question';

describe('Question', () => {
  it('should construct correctly', () => {
    const question = Question.create('my-id', 'is this?');

    expect(question.id).toBe('my-id');
    expect(question.text).toBe('is this?');
  });

  it('should return an updated question with new text when calling changeText', () => {
    const question = Question.create('my-id', 'is this?');

    const updatedQuestion = Question.changeText('maybe?', question);

    expect(question.text).toBe('is this?');
    expect(updatedQuestion.text).toBe('maybe?');
  });
});

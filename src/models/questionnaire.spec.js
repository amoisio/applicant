import Template from './template';
import Questionnaire from './questionnaire';

describe('Questionnaire', () => {

  let template;
  beforeEach(() => {
    let t = Template.create();
    t = Template.addQuestion('Are you this?', t);
    t = Template.addQuestion('Do you do that?', t);
    t = Template.addQuestion('Maybe you would like to ?', t);
    template = t;
  });

  it('should construct questionnaire correctly with multiple questions', () => {
    const quest = Questionnaire.create(template, 'Employer asdf Inc.');

    expect(quest.id).toBeTruthy();
    expect(quest.title).toBe('Employer asdf Inc.');
    expect(quest.isCompleted).toBeFalsy();
    expect(quest.questions.length).toBe(3);
    expect(quest.questions[0].text).toBe('Are you this?');
    expect(quest.questions[1].text).toBe('Do you do that?');
    expect(quest.questions[2].text).toBe('Maybe you would like to ?');
  });

  it('should update a questionnaire question when it is answered', () => {
    const quest = Questionnaire.create(template, 'Employer asdf Inc.');
    const id = quest.questions[0].id;

    const updatedQuest = Questionnaire.answer(id, 'My answer', quest);
    expect(updatedQuest.questions[0].answer).toBe('My answer');
  });

  it('should complete a questionnaire when complete is called', () => {
    const quest = Questionnaire.create(template, 'Employer asdf Inc.');
    const id = quest.questions[0].id;
    const updatedQuest = Questionnaire.answer(id, 'My answer', quest);

    const completedQuest = Questionnaire.complete(updatedQuest);

    expect(completedQuest.isCompleted).toBeTruthy();
  });

  it('should not allow questions of completed questionnaires to be answered', () => {
    const quest = Questionnaire.create(template, 'Employer asdf Inc.');
    const id = quest.questions[0].id;
    const updatedQuest = Questionnaire.answer(id, 'My answer', quest);
    const completedQuest = Questionnaire.complete(updatedQuest);
    const id2 = completedQuest.questions[1].id;

    expect(() => Questionnaire.answer(id2, 'my second answer', completedQuest)).toThrow();
  })
});

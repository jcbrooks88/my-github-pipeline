import Quiz from "../../client/src/components/Quiz";

describe('Quiz Component', () => {
  beforeEach(() => {
    // Intercept the API call and return a mock fixture
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random'
    },
    {
      fixture: 'questions.json', // Assuming questions.json contains mock data
      statusCode: 200
    }).as('getRandomQuestion');
  });

  it('should start the quiz and display the first question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty'); // Ensure first question shows up
  });

  it('should answer questions and complete the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Answer the first question
    cy.get('button').contains('1').click(); // Assuming this is the answer button

    // Verify the quiz completion screen
    cy.get('.alert-success').should('be.visible')
      .and('contain', 'Your score');
  });

  it('should restart the quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Answer the first question
    cy.get('button').contains('1').click();

    // Verify quiz completion
    cy.get('.alert-success').should('be.visible').and('contain', 'Your score');

    // Restart the quiz
    cy.get('button').contains('Take New Quiz').click();

    // Verify quiz restarts by checking if the first question appears again
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should navigate through multiple questions', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Answer the first question
    cy.get('button').contains('1').click();

    // Answer the second question
    cy.get('button').contains('2').click();

    // Verify quiz completion
    cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
  });
});

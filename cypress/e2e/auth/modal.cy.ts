// @ts-ignore
describe('Authentication UI Test', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('opens and closes the auth modal', () => {
        cy.get('Button.bg-blue-400').click();
        cy.get('Modal').should('be.visible');

        cy.contains('Cancel').click();
        cy.get('Modal').should('not.be.visible');
    });

    it('inputs values for sign in', () => {
        cy.get('Button.bg-blue-400').contains('Sign in').click();

        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('Test123@');

        cy.contains('OK').click();
    });

    it('inputs values for sign up', () => {
        cy.get('Button.bg-blue-400').contains('Sign up').click();

        cy.get('input[name=firstName]').type('John');
        cy.get('input[name=lastName]').type('Doe');
        cy.get('input[name=email]').type('johndoe@gmail.com');
        cy.get('input[name=password]').type('Test123@');
        cy.get('input[name=phone]').type('1234567890');
        cy.get('input[name=city]').type('New York');

        cy.contains('OK').click();
    });
});

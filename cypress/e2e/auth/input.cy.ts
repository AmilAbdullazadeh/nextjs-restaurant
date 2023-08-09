// @ts-ignore
describe('Authentication Input UI Tests', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('fills in sign-in inputs and submits', () => {
        cy.get('Button.bg-blue-400').contains('Sign in').click();

        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('Test123@');

        cy.get('input[type=submit]').click();
    });

    it('fills in sign-up inputs and submits', () => {
        cy.get('Button.bg-blue-400').contains('Sign up').click();

        cy.get('input[name=firstName]').type('John');
        cy.get('input[name=lastName]').type('Doe');
        cy.get('input[name=email]').type('johndoe@gmail.com');
        cy.get('input[name=phone]').type('1234567890');
        cy.get('input[name=city]').type('New York');
        cy.get('input[name=password]').type('Test123@');

        cy.get('input[type=submit]').click();
    });

    it('shows loading state', () => {
        cy.get('Button.bg-blue-400').contains('Sign in').click();
        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('Test123@');
        cy.get('input[type=submit]').click();

        cy.contains('Loading...');
    });

    it('shows error state', () => {
        cy.get('Button.bg-blue-400').contains('Sign in').click();
        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('wrongpassword');
        cy.get('input[type=submit]').click();

        cy.contains('Error:');
    });
});

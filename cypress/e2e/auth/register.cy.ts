// @ts-ignore
describe('Registration Tests', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('successfully registers a new user', () => {
        cy.get('Button.bg-blue-400').contains('Sign up').click();

        cy.get('input[name=firstName]').type('John');
        cy.get('input[name=lastName]').type('DoeLong');
        cy.get('input[name=email]').type('johndoe3@gmail.com');
        cy.get('input[name=phone]').type('+994550000123');
        cy.get('input[name=city]').type('New York');
        cy.get('input[name=password]').type('Test123@');

        cy.get('input[type=submit]').click();

        cy.contains('Registration Successful');
    });

    it('fails registration for an existing user', () => {
        cy.get('Button.bg-blue-400').contains('Sign up').click();

        cy.get('input[name=firstName]').type('John');
        cy.get('input[name=lastName]').type('DoeLong');
        cy.get('input[name=email]').type('test2@gmail.com');
        cy.get('input[name=phone]').type('+994550000123');
        cy.get('input[name=city]').type('New York');
        cy.get('input[name=password]').type('Test123@');

        cy.get('input[type=submit]').click();

        cy.contains('User already exist');
    });

    it('fails registration due to invalid input data', () => {
        cy.get('Button.bg-blue-400').contains('Sign up').click();

        cy.get('input[name=firstName]').type('Jo');
        cy.get('input[name=lastName]').type('Doe');
        cy.get('input[name=email]').type('johndoe3gmail.com');
        cy.get('input[name=phone]').type('99455000');
        cy.get('input[name=city]').type('NY');
        cy.get('input[name=password]').type('Test1');

        cy.get('input[type=submit]').click();

        cy.contains('FirstName is invalid');
        cy.contains('Email is invalid');
    });

});

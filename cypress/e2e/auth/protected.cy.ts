// @ts-ignore
describe('AuthWrapper tests', () => {

    beforeEach(() => {
        window.localStorage.removeItem('token');
    });

    it('should redirect to login when not authenticated', () => {
        cy.visit('/protected-route');

        cy.url().should('include', '/login');
    });

    it('should display protected content when authenticated', () => {
        window.localStorage.setItem('token', 'testToken');

        cy.visit('/protected-route');

        cy.contains('Protected Content').should('be.visible');
    });

});

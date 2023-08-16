// @ts-ignore
describe('Price Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should validate the presence of the price symbols', () => {
        cy.get('.flex.mr-3').should('be.visible');
    });
});

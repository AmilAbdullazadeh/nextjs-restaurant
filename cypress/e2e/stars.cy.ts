// @ts-ignore
describe('Stars Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should validate the presence of 5 full stars', () => {
        cy.get('.flex.items-center').contains('★★★★★').should('be.visible');
    });
});

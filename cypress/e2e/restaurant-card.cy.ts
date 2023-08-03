// @ts-ignore
describe('Restaurant Card Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should validate the presence of an image', () => {
        cy.get('img').should('be.visible');
    });

    it('Should validate the presence of the restaurant name', () => {
        cy.get('h3').should('be.visible');
    });

    it('Should validate the presence of stars rating', () => {
        cy.get('.flex.items-center').should('be.visible');
    });

    it('Should validate the presence of the price component', () => {
        cy.get('.flex.mr-3').should('be.visible');
    });
});

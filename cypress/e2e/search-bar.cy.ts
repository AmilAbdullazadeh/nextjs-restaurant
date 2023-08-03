// @ts-ignore
describe('Search Bar Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should input a location and navigate to search results', () => {
        cy.get('input').type('New York');
        cy.get('button').click();
        cy.url().should('include', '/search?city=New York');
    });
});

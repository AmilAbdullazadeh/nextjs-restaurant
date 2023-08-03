// @ts-ignore
describe('Header Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should validate the presence of a gradient background', () => {
        cy.get('.h-64').should('have.css', 'background-image');
    });

    it('Should display the main heading', () => {
        cy.get('h1').should('contain.text', 'Find your table for any occasion');
    });

    it('Should render the SearchBar component', () => {
        cy.get('.text-left').should('be.visible');
    });
});

describe('Components', () => {

    it('SearchBar performs search and clears input', () => {
        cy.visit('/');

        cy.get('.search-bar-input').type('New York');

        cy.get('.search-bar-button').click();

        cy.location('pathname').should('eq', '/search');
        cy.location('search').should('eq', '?city=New+York');

        cy.get('.search-bar-input').should('have.value', '');
    });

    it('RestaurantCard displays correct information and links to correct page', () => {
        cy.visit('/');

        const restaurantCard = cy.get('.restaurant-card').first();

        restaurantCard.get('.restaurant-name').should('have.text', 'Restaurant Name');
        restaurantCard.get('.restaurant-price').should('have.text', '$$$');

        restaurantCard.get('a').should('have.attr', 'href').and('eq', '/restaurant/restaurant-slug');
    });

});

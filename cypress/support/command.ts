import {IRestaurant} from "../../app/page";

Cypress.Commands.add('getRestaurantCard', (index: any) => {
    return cy.get('.home-container .w-64.h-72').eq(index);
});

// @ts-ignore
Cypress.Commands.add('visitHome', () => {
    cy.visit('/');
});

// @ts-ignore
Cypress.Commands.add('checkRestaurantCard', (restaurant: IRestaurants) => {
    cy.get(`[data-test-id="restaurant-${restaurant.id}"]`).within(() => {
        cy.get(`[data-test-id="restaurant-name"]`).should('contain', restaurant.name);
        cy.get(`[data-test-id="restaurant-image"]`).should('have.attr', 'src', restaurant.main_image);
    });
});
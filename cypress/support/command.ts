// @ts-ignore
Cypress.Commands.add('getRestaurantCard', (index: any) => {
    return cy.get('.home-container .w-64.h-72').eq(index);
});
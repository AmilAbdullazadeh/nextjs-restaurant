// // cypress/integration/home-page.spec.js
//
// // @ts-ignore
// describe('Home Page', () => {
//     const sampleRestaurants = [
//         {
//             id: 1,
//             name: 'Restaurant One',
//             main_image: 'image1.jpg',
//             cuisinie: 'Italian',
//             location: 'New York',
//             price: 'MEDIUM',
//             slug: 'restaurant-one',
//             reviews: []
//         },
//     ];
//
//     beforeEach(() => {
//         cy.intercept('GET', '/api/restaurants', sampleRestaurants).as('getRestaurants');
//         cy.visit('/');
//         cy.wait('@getRestaurants');
//     });
//
//     it('Should render the welcome message', () => {
//         cy.contains('Welcome to the Home page').should('be.visible');
//     });
//
//     it('Should render the Header component', () => {
//       cy.get('.header').should('be.visible');
//     });
//
//     it('Should render the Restaurant cards', () => {
//       cy.get('.home-container .restaurant-card').should('have.length', sampleRestaurants.length);
//       cy.get('.home-container .restaurant-card').first().should('contain', 'Restaurant One');
//     });
// });


import HomePage from '../pages/homePage';

describe('Home Page', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        homePage.visit();
    });

    it('Should render the header with the correct title', () => {
        homePage.header().contains('Find your table for any occasion').should('be.visible');
    });

    it('Should allow searching for a location', () => {
        homePage.searchBar().type('New York');
        homePage.searchButton().click();
        cy.url().should('include', '/search?city=New York');
    });

    it('Should render restaurant cards', () => {
        homePage.restaurantCard(0).should('be.visible');
        homePage.restaurantCard(0).contains('Booked 3 times today').should('be.visible');
    });

    it('Should validate the presence of a restaurant image', () => {
        homePage.restaurantCard(0).find('img').should('be.visible');
    });

    it('Should validate the restaurant name', () => {
        homePage.restaurantCard(0).find('h3').should('be.visible');
    });

    it('Should validate the price rendering for a restaurant', () => {
        homePage.restaurantCard(0).find('.flex.mr-3').should('be.visible');
    });

    it('Should validate the stars component with full stars', () => {
        homePage.restaurantCard(0).find('div').contains('★★★★★').should('be.visible');
    });

    it('Should validate the search bar placeholder text', () => {
        homePage.searchBar().should('have.attr', 'placeholder', 'State, city or town');
    });

    it('Should prevent search when the location is empty', () => {
        homePage.searchButton().click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('Should validate the navigation to a restaurant detail page', () => {
        homePage.restaurantCard(0).click();
        cy.url().should('include', '/restaurant/');
    });

});

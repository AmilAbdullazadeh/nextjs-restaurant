import HomePage from '../pages/homePage';
import {IRestaurant} from "../../app/page";

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


describe('Homepage', () => {
    before(() => {
        // @ts-ignore
        cy.visit()
        // cy.visitHome();
        // cy.checkRestaurantCard()
    });

    it('should load the homepage correctly', () => {
        cy.get('[data-test-id="header"]').should('be.visible');
        cy.get('[data-test-id="search-bar"]').should('be.visible');
    });

    it('should load all restaurant cards', () => {
        // @ts-ignore
        const expectedRestaurants: any[] = getExpectedRestaurants();
        expectedRestaurants.forEach((restaurant) => {
            cy.getRestaurantCard(restaurant);
        });
    });

    it('should navigate to the correct restaurant page when a card is clicked', () => {
        // @ts-ignore
        const restaurant: IRestaurant = getExpectedRestaurants()[0];
        cy.get(`[data-test-id="restaurant-${restaurant.id}"]`).click();
        cy.url().should('include', `/restaurant/${restaurant.slug}`);
    });
});

// for cache test
describe('Homepage with ISR', () => {
    it('loads the initial data correctly', () => {
        cy.visit('/');

        cy.get('[data-test-id="restaurant-1"]').should('be.visible');
        cy.get('[data-test-id="restaurant-2"]').should('be.visible');
    });

    it('updates the data after revalidation', () => {
        cy.wait(60000);

        cy.reload();

        cy.get('[data-test-id="restaurant-1"]').should('be.visible');
        cy.get('[data-test-id="new-restaurant"]').should('be.visible'); // error
    });
});


// revalidation test for home page
describe('ISR Revalidation', () => {
    it('should revalidate data after a period of time', () => {
        cy.visit('/');

        cy.intercept('GET', '/api/restaurants', {
            body: [
                {
                    id: 1,
                    name: 'First Restaurant',
                    main_image: 'http://example.com/image1.jpg',
                    cuisinie: 'Italian',
                    location: 'New York',
                    price: 'Regular',
                    slug: 'first-restaurant',
                    reviews: [],
                }
            ],
            delayMs: 500,
            headers: {
                'cache-control': 's-maxage=1, stale-while-revalidate'
            },
        }).as('getRestaurants');

        cy.wait('@getRestaurants'); // => inital api call wait

        cy.get('[data-testid="restaurant-card"]').should('have.length', 1);
        cy.get('[data-testid="restaurant-card"]').first().should('contain.text', 'First Restaurant');

        cy.intercept('GET', '/api/restaurants', {
            body: [
                {
                    id: 2,
                    name: 'Second Restaurant',
                    main_image: 'http://example.com/image2.jpg',
                    cuisinie: 'French',
                    location: 'Paris',
                    price: 'Expensive',
                    slug: 'second-restaurant',
                    reviews: [],
                }
            ],
            delayMs: 500,
            headers: {
                'cache-control': 's-maxage=1, stale-while-revalidate'
            },
        }).as('getUpdatedRestaurants');

        cy.wait(1500);

        cy.reload();

        cy.wait('@getUpdatedRestaurants');

        cy.get('[data-testid="restaurant-card"]').should('have.length', 1);
        cy.get('[data-testid="restaurant-card"]').first().should('contain.text', 'Second Restaurant');
    });
});

//  cache clearing to test
describe('ISR Cache Clearing for Home page and components', () => {
    let callCount = 0;

    beforeEach(() => {
        callCount = 0;

        cy.intercept('GET', '/api/restaurants', (req) => {
            callCount += 1;

            if (callCount === 1) {
                req.reply({
                    body: [
                        {
                            id: 1,
                            name: 'First Restaurant',
                            main_image: 'http://example.com/image1.jpg',
                            cuisinie: 'Italian',
                            location: 'New York',
                            price: 'Regular',
                            slug: 'first-restaurant',
                            reviews: [],
                        }
                    ],
                    headers: {
                        'cache-control': 's-maxage=1, stale-while-revalidate'
                    }
                });
            } else {
                req.reply({
                    body: [
                        {
                            id: 2,
                            name: 'Second Restaurant',
                            main_image: 'http://example.com/image2.jpg',
                            cuisinie: 'French',
                            location: 'Paris',
                            price: 'Expensive',
                            slug: 'second-restaurant',
                            reviews: [],
                        }
                    ],
                    headers: {
                        'cache-control': 's-maxage=1, stale-while-revalidate'
                    }
                });
            }
        }).as('getRestaurants');
    });

    it('should render different data after revalidation', () => {
        cy.visit('/');
        cy.wait('@getRestaurants');
        cy.get('[data-testid="restaurant-card"]').first().should('contain.text', 'First Restaurant');

        cy.visit('/');
        cy.wait('@getRestaurants');
        cy.get('[data-testid="restaurant-card"]').first().should('contain.text', 'Second Restaurant');
    });
});

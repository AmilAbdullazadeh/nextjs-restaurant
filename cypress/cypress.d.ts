declare namespace Cypress {
    interface Chainable<Subject> {
        getRestaurantCard(i: any): Chainable<Subject>;
        customCommand2(): Chainable<Subject>;
        customCommand3(): Chainable<Subject>;
    }
}

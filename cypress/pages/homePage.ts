class HomePage {
    visit() {
        cy.visit('http://localhost:3000/');
    }

    header() {
        return cy.get('.h-64.bg-gradient-to-r');
    }

    searchBar() {
        return cy.get('.rounded.w-[450px]');
    }

    searchButton() {
        return cy.get('.rounded.bg-red-600');
    }

    restaurantCard(index: any) {
        return cy.getRestaurantCard(index);
    }
}

export default HomePage;

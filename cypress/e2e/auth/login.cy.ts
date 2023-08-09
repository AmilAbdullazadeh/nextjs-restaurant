// @ts-ignore
describe('Authentication Test', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('logs in successfully', () => {
        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('Test123@');
        cy.get('button[type=submit]').click();

        cy.request({
            method: 'POST',
            url: '/api/login',
            body: {
                email: 'test1@gmail.com',
                password: 'Test123@'
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.email).to.eq('test1@gmail.com');
        });
    });

    it('shows error for invalid email format', () => {
        cy.get('input[name=email]').type('invalidEmail');
        cy.get('input[name=password]').type('Test123@');
        cy.get('button[type=submit]').click();

        cy.contains('Email is invalid');
    });

    it('shows error for invalid password format', () => {
        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('weakpassword');
        cy.get('button[type=submit]').click();

        cy.contains('Password is invalid');
    });

    it('shows error for incorrect password', () => {
        cy.get('input[name=email]').type('test1@gmail.com');
        cy.get('input[name=password]').type('IncorrectPassword123@');
        cy.get('button[type=submit]').click();

        cy.contains('Password is incorrect');
    });

    it('shows error for non-existent user', () => {
        cy.get('input[name=email]').type('nonexistentuser@gmail.com');
        cy.get('input[name=password]').type('Test123@');
        cy.get('button[type=submit]').click();

        // db testings, db resets

        cy.contains('User data not found');
    });
});

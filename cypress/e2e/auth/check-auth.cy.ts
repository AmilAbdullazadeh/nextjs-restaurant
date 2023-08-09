// @ts-ignore
//! [/me] or [/profile]
describe('/me Endpoint Tests', () => {

    const testUserToken = 'YOUR_TEST_USER_TOKEN';
    const invalidToken = 'INVALID_TEST_TOKEN';

    it('fetches user data with a valid token', () => {

        cy.request({
            method: 'GET',
            url: '/api/me',
            headers: {
                'Authorization': `Bearer ${testUserToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('email');
        });

    });

    it('unauthorized access without token', () => {

        cy.request({
            method: 'GET',
            url: '/api/me',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.errorMessage).to.eq("Unauthorized ( not payload )");
        });

    });

    it('unauthorized access with an invalid token', () => {

        cy.request({
            method: 'GET',
            url: '/api/me',
            headers: {
                'Authorization': `Bearer ${invalidToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.errorMessage).to.eq("Unauthorized ( not payload )");
        });

    });

});


// ***** //

describe('/me Endpoint Tests', () => {

    beforeEach(() => {
        cy.intercept('GET', '/api/me', (req) => {
            if (req.headers['authorization'] === `Bearer YOUR_TEST_USER_TOKEN`) {
                req.reply({
                    statusCode: 200,
                    body: {
                        data: {
                            email: 'testuser@example.com',
                        }
                    }
                });
            } else if (!req.headers['authorization'] || req.headers['authorization'] === `Bearer INVALID_TEST_TOKEN`) {
                req.reply({
                    statusCode: 401,
                    body: {
                        errorMessage: "Unauthorized ( not payload )"
                    }
                });
            }
        });
    });

    it('fetches user data with a valid token', () => {
        cy.request({
            method: 'GET',
            url: '/api/me',
            headers: {
                'Authorization': `Bearer YOUR_TEST_USER_TOKEN`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('email', 'testuser@example.com');
        });
    });

    it('unauthorized access without token', () => {
        cy.request({
            method: 'GET',
            url: '/api/me',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.errorMessage).to.eq("Unauthorized ( not payload )");
        });
    });

    it('unauthorized access with an invalid token', () => {
        cy.request({
            method: 'GET',
            url: '/api/me',
            headers: {
                'Authorization': `Bearer INVALID_TEST_TOKEN`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.errorMessage).to.eq("Unauthorized ( not payload )");
        });
    });

});

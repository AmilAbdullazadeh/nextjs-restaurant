// import { defineConfig } from 'cypress'
//
// export default defineConfig({
//     e2e: {
//         setupNodeEvents(on, config) {
//             // implement node event listeners here
//             require('cypress-grep/src/plugin')(config)
//             return config;
//         },
//         specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
//         supportFile: false,
//         chromeWebSecurity: false,
//         viewportWidth: 1920,
//         env: {
//             baseUrl: 'http://localhost:3000',
//             apiUrl: 'http://localhost:3000',
//             graphqlUrl: 'http://localhost:3000',
//         },
//         baseUrl: 'http://localhost:3000',
//     }
// })


import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {

            // implement node event listeners here
        },
        baseUrl: 'http://localhost:3000'
    },
});
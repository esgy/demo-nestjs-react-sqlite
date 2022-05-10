# Demo App w/ NestJS, Sqlite, React

Simple Demo app with local state.

## Setup

1. `npm i` in root folder (it will run `postinstall` for both client & api)

2. `npm start` in root folder

## Test

For Unit tests:
Run `npm test` in each service

For E2E tests:

Run `npm start` in root

Run `npm run cypress` in separate terminal window

## TODO

- [x] API: Separate Album/Artist into modules
- [x] FE: Add React Router to separate views & user Route params to fetch search term
- [ ] API: refactor REST endpoint into GraphQL API
- [ ] FE: Update Cypress tests to add React Testing Library module to fetch page elements
- [ ] FE: Move Artist Details in a Modal
- [ ] API & FE: Add CRUD functionality: Add/Edit/Delete Artist/Album
- [ ] API: Update tests handling the additional CRUD functionality
- [ ] Add Docker-Compose for API & FE

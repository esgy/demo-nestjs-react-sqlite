# Demo App w/ NestJS, Sqlite, React

Simple Demo app with local state.

## Setup

1. `npm i` in root folder

2. Duplicate or rename `.env.example` to `.env.local` in the `frontend` package

3. `npm start`

## Test

For Unit tests:
Run `npm test` in each service

For E2E tests:

Run `npm start` in root

Run `npm run cypress` in separate terminal window

## TODO

- [x] API: Separate Album/Artist into modules
- [ ] FE: Add React Router to separate views & user Route params to fetch search term
- [ ] FE: Update Cypress tests to add React Testing Library module to fetch page elements
- [ ] FE: Move Artist Details in a Modal
- [ ] API & FE: Add CRUD functionality: Add/Edit/Delete Artist/Album
- [ ] API: Update tests handling the additional CRUD functionality
- [ ] API: refactor REST endpoint into GraphQL API
- [ ] Add Docker-Compose for API & FE

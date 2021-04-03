# Demo App w/ NestJS, Sqlite, React

Simple Demo app with local state.

## Setup

1. `npm i`

2. Duplicate or rename `.env.example` to `.env.local` in the `frontend` package

3. `npm start`

## Test

For Unit tests:
`npm test`

For E2E tests:
`npm start`
`npm run cypress`

## TODO

- [x] API: separate Album/Artist into modules
- [ ] API: add more tests
- [ ] Frontend: Add more e2e Cypress Tests
- [ ] Frontend: Add React Router to separate views & user Route params to fetch search term
- [ ] Frontend: Artist Details in Modal
- [ ] API&Frontend: Add CRUD functionality: Add/Edit/Delete Artist/Album
- [ ] Add Fulltext search

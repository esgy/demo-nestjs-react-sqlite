# Demo App w/ NestJS, Sqlite, React

Simple Demo app with local state.

## Setup

`npm i`

Duplicate or rename .env.example to .env.local in the `frontend` package

## Test

For Unit tests:

`npm test`

For E2E tests:

`npm run cypress`

## TODO

- [x] API: separate Album/Artist into modules
- [ ] API: add more tests
- [ ] Frontend: Add more e2e Cypress Tests
- [ ] Frontend: Add React Router to separate views & user Route params to fetch search term
- [ ] Frontend: Artist Details in Modal
- [ ] API&Frontend: Add CRUD functionality: Add/Edit/Delete Artist/Album
- [ ] Add Fulltext search

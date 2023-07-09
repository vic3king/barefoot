# Barefoot

Barefoot Nomad API

## API Documentation

The full API documentation can be found by following the link below:

[link](http://localhost:4111/v1/api-docs/)

## Requirements and Installation

**Via Cloning The Repository**

```bash
# Clone the app
git clone https://github.com/vic3king/barefoot.git

# Switch to directory
cd backend-worksample

# Install Package dependencies
npm install

# create a .env file and make a clone of the .example.env
touch .env

#Start the application
npm run start:dev

#View the application
navigate to localhost:3000 to view the application
```

## Testing

```bash
npm run test
```

## Technologies

### Backend

- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Typescript](https://www.typescriptlang.org/) TypeScript is JavaScript with syntax for types.
- [Express JS](http://express.com) A minimalist web framework
- [MongoDB](https://www.mongodb.com/) The database for modern applications.
- [MongooseORM](https://mongoosejs.com/) Elegant mongodb object modeling for node.js
- [Jest](https://jestjs.io/) Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Supertest](https://www.npmjs.com/package/supertest) SuperAgent driven library for testing HTTP servers

#### Linter(s)

- [GTS](https://github.com/google/gts) gts is Google's TypeScript style guide, and the configuration for our formatter, linter, and automatic code fixer.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Prettier](https://prettier.io) Prettier is an opinionated code formatter with support for Javascript

### Style Guide

- [Google Typescript Guide](https://google.github.io/styleguide/tsguide.html) - Style Guide

#### Compiler

- [Typescript](https://www.npmjs.com/package/typescript) A Typescript compiler for converting codes written in typescript to javascript

## API Endpoints
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
    <tr>
      <td>POST</td>
      <td>/</td>
      <td>Welcome screen</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/v1/users/</td>
    <td>create a user</td>
  </tr>
   <tr>
    <td>GET</td>
    <td>/v1/users</td>
    <td>Get all users</td>
  </tr>

</table>

## Possible Improvements

- Dockerize
- Deploy
  
## Authors

- **Akaniru Victory** - _Initial work_ - [Vic3King](www.akaniruvictory.com)

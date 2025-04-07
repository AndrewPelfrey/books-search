# Book Search

## Description

This is a full-stack MERN application that allows users to search for books using the Google Books API and save their favorite titles to their personal account. Originally built with a RESTful API, the application has been refactored to use GraphQL with Apollo Server. Authenticated users can save books to their profile and remove them when desired.

The app uses a React front end, Apollo Client/Server for GraphQL queries and mutations, Node.js/Express.js for the backend, and MongoDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [GraphQL Schema](#graphql-schema)
- [Deployment](#deployment)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd book-search-engine
Install server and client dependencies:
cd server
npm install

cd ../client
npm install
Set up environment variables in a .env file at the root:
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
Start the development server:
cd ..
npm run develop
Usage

Search for books using the Google Books API.
Log in or sign up to create an account.
Save your favorite books to your profile.
Remove saved books as needed.
View your saved books on a dedicated page.

## Technologies Used

- React
- Node.js
- Express.js
- Apollo Server & Apollo Client
- GraphQL
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Google Books API
- Render (for deployment)

## Features

Responsive UI with React
GraphQL API replacing RESTful routes
User authentication and authorization
Save and remove books from user profiles
Search functionality powered by Google Books API
Clean and intuitive interface
GraphQL Schema

Queries
me: User
Mutations
login(email: String!, password: String!): Auth
addUser(username: String!, email: String!, password: String!): Auth
saveBook(bookData: BookInput!): User
removeBook(bookId: String!): User
Types
type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]
}

type Book {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}

type Auth {
  token: ID!
  user: User
}

input BookInput {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}

## Deployment

The application is deployed on Render and uses MongoDB Atlas for the database.

Frontend URL: https://your-frontend-url.onrender.com
Backend URL (GraphQL endpoint): https://your-backend-url.onrender.com/graphql
Replace the URLs above with your actual deployed links.
License

This project is licensed under the MIT License.
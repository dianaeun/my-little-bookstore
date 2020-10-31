const { buildSchema } = require('graphql');

const schema =  buildSchema(`
    type Book{
        _id: ID!
        title: String!
        date: String!
        publisher: String!
        author: String!
        isbn: String!
        rating: Int!
        price: Float!
        genre: String!
        description: String
        owner: User!
    }
    type User{
        _id: ID!
        email: String!
        password: String!
        userID: String!
        location: String
        preferredGenres: [String]!
    }
    type AuthData{
        email: String!
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    input BookInput {
        title: String!
        date: String!
        publisher: String!
        author: String!
        isbn: String!
        rating: Int!
        price: Float!
        genre: String!
        description: String
        owner: String!
    }
    input UserInput {
        email: String!
        password: String!
        userID: String!
        location: String
        preferredGenres: [String]!
    }
    type RootQuery {
        books: [Book]!
        userBooks: [Book]!
        login(email: String!, password: String!): AuthData!
        users: [User]!
        findByUserID(userID: String!): User
    }
    type RootMutation {
        createBook(bookInput: BookInput): Book
        createUser(userInput: UserInput): User
        deleteBook(bookId: ID!): Book!
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);
module.exports = schema;

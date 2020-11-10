const { buildSchema } = require('graphql');

const schema =  buildSchema(`
    type Book{
        _id: ID!
        title: String!
        date: String!
        publisher: String!
        author: String!
        isbn: String
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
        location: String!
        preferredGenres: [String]!
    }
    type Discussion{
        _id: ID!
        owner: String!
        date: String!
        tag: String!
        title: String!
        content: String!
        likes: Int!
        comments: [Comment]!
    }
    type Comment{
        _id: ID!
        owner: String!
        discussion: Discussion!
        date: String!
        content: String!
    }
    type Request{
        _id: ID!
        bookTitle: String!
        book: Book!
        sender: User!
        receiver: User!
        status: String!
        date: String!
    }
    type AuthData{
        email: String!
        userID: String!
        token: String!
        tokenExpiration: Int!
        user_id: ID!
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
        owner: ID!
    }
    input UserInput {
        email: String!
        password: String!
        userID: String!
        location: String
        preferredGenres: [String]!
    }
    input CommentInput {
        owner: String!
        discussion: ID!
        date: String!
        content: String!
    }
    input RequestInput {
        bookTitle: String!
        book: ID!
        sender: ID!
        receiver: ID!
        status: String!
        date: String!   
    }
    input DiscussionInput {
        owner: String!
        date: String!
        tag: String!
        title: String!
        content: String!
    }
    type RootQuery {
        books: [Book]!
        userBooks(ownerID: String!): [Book]!
        sameBooks(bookTitle: String!) : [Book]!
        login(email: String!, password: String!): AuthData!
        users: [User]!
        findByUserID(userID: String!): User
        discussions: [Discussion]!
        comments: [Comment]!
        receivedRequests(receiverID: String!): [Request]!
        sentRequests(senderID: String!): [Request]! 
    }
    type RootMutation {
        createBook(bookInput: BookInput): Book
        createUser(userInput: UserInput): User
        deleteBook(bookId: ID!): Book!
        createRequest(requestInput: RequestInput): Request
        cancelRequest(requestID: ID!): Request
        acceptRequest(requestID: ID!): Request
        declineRequest(requestID: ID!): Request
        createDiscussion(discussionInput: DiscussionInput): Discussion
        createComment(commentInput: CommentInput): Comment
        updateLikes(_id: ID!, likes: Int!): Discussion
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);
module.exports = schema;

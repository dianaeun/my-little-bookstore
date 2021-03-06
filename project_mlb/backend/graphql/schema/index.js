const { buildSchema } = require('graphql');

const schema =  buildSchema(`
    type Book{
        _id: ID!
        title: String!
        date: String!
        publisher: String!
        author: String!
        isbn: String
        rating: Rating!
        price: Float!
        genre: String!
        image: String
        description: String
        owner: User!
    }
    type EBook{
        _id: ID!
        title: String!
        file: String!
        date: String!
        rating: Rating!
        owner: User!
    }
    type User{
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        userID: String!
        location: String!
        preferredGenres: [String]!
        phoneNumber: String!
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
    type Review{
        _id: ID!
        reviewer: String!
        bookTitle: String!
        date: String!
        title: String!
        content: String!
    }
    type AuthData{
        firstName: String!
        preferredGenres: [String]!
        email: String!
        userID: String!
        token: String!
        tokenExpiration: Int!
        user_id: ID!
    }
    type Rating{
        _id: ID!
        bookTitle: String!
        ratingSum: Int!
        raters: [ID]!
        rating: Float!
    }
    input BookInput {
        title: String!
        date: String!
        publisher: String!
        author: String!
        isbn: String!
        price: Float!
        genre: String!
        image: String!
        owner: ID!
        description: String!
    }
    input EditBookInput {
        title: String!
        date: String!
        publisher: String!
        author: String!
        price: Float!
    }
    input EBookInput {
        title: String!
        file: String!
        date: String!
        owner: ID!
    }
    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        userID: String!
        location: String
        preferredGenres: [String]!
        phoneNumber: String
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
    input ReviewInput {
        bookTitle: String!
        reviewer: String!
        date: String!
        title: String!
        content: String!
    }
    input DiscussionInput {
        owner: String!
        date: String!
        tag: String!
        title: String!
        content: String!
    }
    type RootQuery {
        findByBookID(bookID: String!): Book
        books: [Book]!
        ebooks: [EBook]!
        userBooks(ownerID: String!): [Book]!
        userEBooks(ownerID: String!): [EBook]!
        sameBooks(bookTitle: String!) : [Book]!
        login(email: String!, password: String!): AuthData!
        users: [User]!
        findByUserID(userID: String!): User
        discussions: [Discussion]!
        comments: [Comment]!
        receivedRequests(receiverID: String!): [Request]!
        sentRequests(senderID: String!): [Request]!
        bookReviews(bookID: String!): [Review]!
    }
    type RootMutation {
        createBook(bookInput: BookInput): Book
        createEBook(eBookInput: EBookInput): EBook
        createUser(userInput: UserInput): User
        editUser(userInput: UserInput): User
        deleteBook(bookId: ID!): Book!
        editBook(bookId: ID!, bookInput: EditBookInput): Book!
        createRequest(requestInput: RequestInput): Request
        cancelRequest(requestID: ID!): Request
        acceptRequest(requestID: ID!): Request
        declineRequest(requestID: ID!): Request
        createDiscussion(discussionInput: DiscussionInput): Discussion
        createComment(commentInput: CommentInput): Comment
        updateLikes(_id: ID!, likes: Int!): Discussion
        createReview(reviewInput: ReviewInput): Review
        rate(_id: ID!, rating: Int!, userID: ID!): Rating 
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);
module.exports = schema;

const Book = require('../../models/book');
const User = require('../../models/user');
const Request = require('../../models/request');
const Rating = require('../../models/rating');
const {transformBook} = require('./merge');
const DataLoader = require('dataloader')
const userLoader = new DataLoader( userIDs => {
    return User.find( { _id: {$in: userIDs}});
})

module.exports = {
    findByBookID: async ({bookID}) => {
        try {
            const abook = await Book.findOne({_id: bookID});
            // console.log("found a book", abook);
            return transformBook(abook);
        } catch (err) {
            throw err;
        }
    },
    books: async () => {
        try {
            const books = await Book.find();
            return books.map(book => {
                return transformBook(book);
            })
        }
        catch(err){
            throw err;
        }
    },
    userBooks: async ({ownerID}) => {
        try {
            console.log("finding userBooks: ", ownerID);
            const books = await Book.find({owner: ownerID});
            console.log("userBooks:", books);
            return books.map(book => {
                return transformBook(book);
            })
        }
        catch(err){
            throw err;
        }
    },
    sameBooks: async ({bookTitle}) => {
        try {
            const books = await Book.find({title : bookTitle});
            console.log("same books: ", books);

            return books.map(book => {
                return transformBook(book);
            })
        }
        catch(err){
            throw err;
        }
    },
    createBook: async(args) => {
        let rating_id;
        let rating = await Rating.findOne({bookTitle: args.bookInput.title});
        console.log("found rating!", rating);
        if (rating){
            rating_id = rating._id;
        }
        else{
            rating = new Rating({bookTitle: args.bookInput.title, rating: 0, ratingSum: 0, raters: []});
            const result = await rating.save();
            console.log("This is a new book, successfully created rating", result);
            rating_id = result.id;
        }
        console.log("rating_id", rating_id);
        const book = new Book({
            title: args.bookInput.title,
            date: new Date(args.bookInput.date),
            publisher: args.bookInput.publisher,
            author: args.bookInput.author,
            isbn: args.bookInput.isbn,
            rating: rating_id,
            price: args.bookInput.price,
            genre: args.bookInput.genre,
            description: args.bookInput.description,
            owner: args.bookInput.owner,
            requests: [],
        });

        try{
            const result = await book.save();
            console.log("Successfully Created Book", result);
            return transformBook(result);
        }
        catch (err){
            throw err;
        }

    },
    deleteBook: async (args, req) => {
        try {
            const book = await Book.findById(args.bookId).populate('book');
            const deletedBook = transformBook(book);
            await Book.deleteOne({ _id: args.bookId });
            await Request.deleteMany({book: args.bookId});

            return deletedBook;
        } catch (err) {
            throw err;
        }
    },
    editBook: async (args) => {
        try {
            const book = await Book.findOneAndUpdate({_id: args.bookId}, 
                {title: args.bookInput.title,
                date: new Date(args.bookInput.date),
                publisher: args.bookInput.publisher,
                author: args.bookInput.author,
                isbn: args.bookInput.isbn,
                price: args.bookInput.price,
                genre: args.bookInput.genre,
                description: args.bookInput.description}, {
                new: true
              }).populate('book');
            const editBook = transformBook(book);
            return editBook;
        } catch (err) {
            throw err;
        }
    }
};

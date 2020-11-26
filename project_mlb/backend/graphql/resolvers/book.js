const Book = require('../../models/book');
const User = require('../../models/user');
const Request = require('../../models/request');
const {transformBook} = require('./merge');
const DataLoader = require('dataloader')
const userLoader = new DataLoader( userIDs => {
    return User.find( { _id: {$in: userIDs}});
})
module.exports = {
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
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        // ownerID = req.userId;
        // ownerID = "5f976afd74382937987f902f"; //default id
        try {
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
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        // ownerID = req.userId;
        // ownerID = "5f976afd74382937987f902f";
        const book = new Book({
            title: args.bookInput.title,
            date: new Date(args.bookInput.date),
            publisher: args.bookInput.publisher,
            author: args.bookInput.author,
            isbn: args.bookInput.isbn,
            rating: args.bookInput.rating,
            price: args.bookInput.price,
            genre: args.bookInput.genre,
            description: args.bookInput.description,
            owner: args.bookInput.owner,
            requests: [],
        });
        // const owner = await User.find({ownerID: args.bookInput.owner});
        // if (!owner) {
        //     throw new Error('User not found.');
        // }
        try{
            const result = await book.save();
            return transformBook(result);
        }
        catch (err){
            throw err;
        }

    },
    deleteBook: async (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
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
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        try {

            
            //let result = await Request.findOneAndUpdate({_id: requestID}, {status: "declined"}, {new: true});
            const book = await Book.findByIdAndUpdate({_id: args.bookId}, {title: args.bookInput.title,
                date: new Date(args.bookInput.date),
                publisher: args.bookInput.publisher,
                author: args.bookInput.author,
                isbn: args.bookInput.isbn,
                rating: args.bookInput.rating,
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

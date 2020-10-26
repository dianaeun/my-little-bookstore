const Book = require('../../models/book');
const User = require('../../models/user');
const {transformBook} = require('./merge');
const DataLoader = require('dataloader')
const userLoader = new DataLoader( userIds => {
    return User.find( { _id: {$in: userIds}});
})
module.exports = {
    books: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const books = await Book.find({owner : req.userId});
            return books.map(book => {
                return transformBook(book);
            })
        }
        catch(err){
            throw err;
        }
    },
    createBook: async(args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const book = new Book({
            title: args.bookInput.title,
            date: new Date(args.bookInput.date),
            description: args.bookInput.description,
            sets: args.bookInput.sets,
            owner: req.userId
        });
        const owner = await User.findById(req.userId);
        if (!owner) {
            throw new Error('User not found.');
        }

        try{
            const result = await book.save();
            return transformBook(result);
        }
        catch (err){
            throw err;
        }

    },
    deleteBook: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const book = await Book.findById(args.bookId).populate('book');
            const deletedBook = transformBook(book);
            await Book.deleteOne({ _id: args.bookId });
            return deletedBook;
        } catch (err) {
            throw err;
        }
    }
};
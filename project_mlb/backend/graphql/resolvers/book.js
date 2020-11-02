const Book = require('../../models/book');
const User = require('../../models/user');
const {transformBook} = require('./merge');
const DataLoader = require('dataloader')
const userLoader = new DataLoader( userIds => {
    return User.find( { _id: {$in: userIds}});
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
            const books = await Book.find({owner : ownerID});
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
            return deletedBook;
        } catch (err) {
            throw err;
        }
    }
};

const EBook = require('../../models/ebook');
const User = require('../../models/user');
const Rating = require('../../models/rating');
const {transformEBook} = require('./merge');
const DataLoader = require('dataloader')

const userLoader = new DataLoader( userIDs => {
    return User.find( { _id: {$in: userIDs}});
})

module.exports = {
    ebooks: async () => {
        try {
            const ebooks = await EBook.find();
            return ebooks.map(book => {
                return transformEBook(book);
            })
        }
        catch(err){
            throw err;
        }
    },
    userEBooks: async ({ownerID}) => {
        try {
            const ebooks = await EBook.find({owner: ownerID});
            //console.log("userEBooks:", ebooks);
            return ebooks.map(book => {
                return transformEBook(book);
            })
        }
        catch(err){
            throw err;
        }
    },
    createEBook: async(args) => {
        let rating_id;
        let rating = await Rating.findOne({bookTitle: args.eBookInput.title});
        //console.log("found rating!", rating);
        if (rating){
            rating_id = rating._id;
        }
        else{
            rating = new Rating({bookTitle: args.eBookInput.title, rating: 0, ratingSum: 0, raters: []});
            const result = await rating.save();
            console.log("This is a new E-book, successfully created rating", result);
            rating_id = result.id;
        }
        console.log("rating_id", rating_id);
        
        const ebook = new EBook({
            title: args.eBookInput.title,
            file: args.eBookInput.file,
            date: new Date(args.eBookInput.date),
            rating: rating_id,
            owner: args.eBookInput.owner
        });
        try{
            const result = await ebook.save();
            //console.log("Successfully Created EBook", result);
            return transformEBook(result);
        }
        catch (err){
            throw err;
        }

    }
};

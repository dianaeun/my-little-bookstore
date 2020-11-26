const Book = require('../../models/book');
const Rating = require('../../models/rating');
const { transformRating } = require('./merge');
module.exports = {
    rate: async (args) => {
        try{
            console.log("rate start..", args);

            const prevRating = await Rating.findById(args._id);
            console.log("rate.....prevRating", prevRating);
            
            const updateRating = await Rating.findOneAndUpdate({_id: args._id}, { $inc: {ratingSum: args.rating}, $push: {raters: args.userID}});
            console.log("successfully rated!", updateRating);

            // const books = await Book.find({title: updateRating.bookTitle});
            // books.map(book => {
            //     Book.updateOne({_id: book._id}, {rating: updateRating});
            // });

            return transformRating(updateRating);
        }
        catch (err){
            throw err;
        }
    }
};
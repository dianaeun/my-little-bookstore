const Review = require('../../models/review');
const { transformReview } = require('./merge');

module.exports = {
    bookReviews: async ({bookID}) => {
        try {
            const reviews = await Review.find({bookTitle: bookID});
            console.log(reviews);
            return reviews.map(review => {
                return transformReview(review);
            })
        }
        catch(err){
            throw err;
        }
    },
    createReview: async args => {
        try {
            const review = new Review({
                reviewer: args.reviewInput.reviewer,
                bookTitle: args.reviewInput.bookTitle,
                date: new Date(args.reviewInput.date),
                content: args.reviewInput.content
            });
            console.log(review);
            const result = await review.save();
            console.log("Review Saved!!, result:", result);
            return { ...result._doc, password: null, _id: result.id };
            //return transformReview(result);
        } catch (err) {
            throw err;
        }
    }
};
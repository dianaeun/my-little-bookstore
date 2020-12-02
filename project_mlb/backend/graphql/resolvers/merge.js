const User = require('../../models/user');
const Book = require('../../models/book');
const Rating = require('../../models/rating');

const dateToString = date => {
    const newDate = new Date(date);
    const month = newDate.getMonth()+1;
    return newDate.getFullYear()+'/'+month+'/'+newDate.getDate();
}

const findUser = async userID => {
    try{
        console.log("findUser...", userID);
        const user = await User.findOne({_id: userID});
        // const user = await userLoader.load(userID.toString()); // -> Error ### Never Use this!!! (2, Dec, 2020)
        console.log("found user", user);
        // const user = await User.find({_id: userID})
        // console.log("Found user while fetching book:", user._doc);
        return {
            ...user._doc,
            _id: user.id,
            password: null
        }
    }
    catch (err){
        throw err;
    }
};

const findBook = async bookID => {
    try{
        const book = await Book.findOne({_id: bookID});
        // console.log("Found Book while fetching book:", book._doc);
        return {
            ...book._doc,
            _id: book.id
        }
    }
    catch (err){
        throw err;
    }
}
const findRating = async ratingID => {
    try{
        // const rating = await ratingLoader.load(ratingID.toString());
        const rating = await Rating.findById(ratingID);
        // console.log("Found Rating while fetching rating:", rating);
        const result = await rating.raters.length === 0 ? 0 : rating.ratingSum / rating.raters.length;
        // console.log("Computed Rate>>", result);

        return {
            ...rating._doc,
            rating: result
        };
    }
    catch (err){
        throw err;
    }
}


const transformBook = book => {
    // console.log("transforming book...", book);
    //console.log("owner:", findUser(book.owner));
    return {
        ...book._doc,
        _id: book.id,
        date: dateToString(book._doc.date),
        owner: findUser.bind(this, book._doc.owner),
        rating: findRating.bind(this, book._doc.rating)
    }
};

const transformEBook = ebook => {
    //console.log("transforming Ebook...", ebook._doc.owner);
    //console.log("owner:", findUser(book.owner));
    return {
        ...ebook._doc,
        _id: ebook.id,
        date: dateToString(ebook._doc.date),
        owner: findUser.bind(this, ebook._doc.owner),
        rating: findRating.bind(this, ebook._doc.rating)
    }
};

const transformDiscussion = discussion => {
    return {
        ...discussion._doc,
        _id: discussion.id,
        date: dateToString(discussion._doc.date),
        // owner: findUser.bind(this, discussion.owner)
    }
};
const transformComment = comment => {
    return {
        ...comment._doc,
        _id: comment.id,
        date: dateToString(comment._doc.date),
        // owner: findUser.bind(this, comment.owner)
    }
};
const transformRequest = request => {
    return {
        ...request._doc,
        _id: request.id,
        date: dateToString(request._doc.date),
        sender: findUser.bind(this, request._doc.sender),
        receiver: findUser.bind(this, request._doc.receiver),
        book: findBook.bind(this, request._doc.book)
    }
}

const transformReview = review => {
    return {
        ...review._doc,
        _id: review.id,
        date: dateToString(review._doc.date),
        //reviewer: findUser.bind(this, review._doc.reviewer),
        //book: findBook.bind(this, review._doc.book)
    }
}
const transformRating = rating => {
    return {
        ...rating._doc,
        _id: rating.id
    }
}
exports.transformBook = transformBook;
exports.transformEBook = transformEBook;
exports.transformDiscussion = transformDiscussion;
exports.transformComment = transformComment;
exports.transformRequest = transformRequest;
exports.transformReview = transformReview;
exports.transformRating = transformRating;

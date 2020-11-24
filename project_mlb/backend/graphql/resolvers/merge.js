const User = require('../../models/user');
const Book = require('../../models/book');
const dateToString = date => {
    const newDate = new Date(date);
    const month = newDate.getMonth()+1;
    return newDate.getFullYear()+'/'+month+'/'+newDate.getDate();
}

const DataLoader = require('dataloader');
const userLoader = new DataLoader( userIDs => {
    console.log("userLoader", userIDs)
    return User.find({ _id: { $in: userIDs }});
});
const bookLoader = new DataLoader( bookIDs => {
    return Book.find({ _id: { $in: bookIDs }});
});

const findUser = async userID => {
    try{
        console.log("findUser...");
        const user = await userLoader.load(userID.toString()); // -> Error
        console.log("Found user while fetching book:", user._doc);
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
        const book = await bookLoader.load(bookID.toString());
        console.log("Found Book while fetching book:", book._doc);
        return {
            ...book._doc,
            _id: book.id
        }
    }
    catch (err){
        throw err;
    }
}
const transformBook = book => {
    console.log("transforming book...", book._doc.owner);
    //console.log("owner:", findUser(book.owner));
    return {
        ...book._doc,
        _id: book.id,
        date: dateToString(book._doc.date),
        owner: findUser.bind(this, book._doc.owner)
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

exports.transformBook = transformBook;
exports.transformDiscussion = transformDiscussion;
exports.transformComment = transformComment;
exports.transformRequest = transformRequest;
exports.transformReview = transformReview;

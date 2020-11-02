const User = require('../../models/user');
const dateToString = date => {
    const newDate = new Date(date);
    const month = newDate.getMonth()+1;
    return newDate.getFullYear()+'/'+month+'/'+newDate.getDate();
}

const DataLoader = require('dataloader');
const userLoader = new DataLoader( userIDs => {
    return User.find({ _id: { $in: userIDs }});
});
const findUser = async userID => {
    try{
        const user = await userLoader.load(userID.toString());
        console.log("Find user while fetching book:", user._doc);
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
const transformBook = book => {
    return {
        ...book._doc,
        _id: book.id,
        date: dateToString(book._doc.date),
        owner: findUser.bind(this, book.owner)
    }
};
const transformDiscussion = discussion => {
    return {
        ...discussion._doc,
        _id: discussion.id,
        date: dateToString(discussion._doc.date),
        owner: findUser.bind(this, discussion.owner)
    }
};
const transformComment = comment => {
    return {
        ...comment._doc,
        _id: comment.id,
        date: dateToString(comment._doc.date),
        owner: findUser.bind(this, comment.owner)
    }
};
exports.transformBook = transformBook;
exports.transformDiscussion = transformDiscussion;
exports.transformComment = transformComment;

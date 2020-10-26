const User = require('../../models/user');
const dateToString = date => new Date(date).toISOString();

const DataLoader = require('dataloader');
const userLoader = new DataLoader( userIds => {
    return User.find({ _id: { $in: userIds }});
});
const findUser = async userId => {
    try{
        const user = await userLoader.load(userId.toString());
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
exports.transformBook = transformBook;

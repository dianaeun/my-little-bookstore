const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                console.log("Resolving query of 'user'.................\n :", user);
                return {...user._doc}
            });
        }
        catch (err){
            throw err;
        }
    },
    findByUserID: async ({userID}) => {
        try {
            const existingUser = await User.findOne({ userID: userID });
            return existingUser;
        } catch (err) {
            throw err;
        }
    },
    createUser: async args => {
        try {
            let existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) 
                throw new Error('DuplicatedUser');
            existingUser = await User.findOne({ userID: args.userInput.userID });
            if (existingUser) 
                throw new Error('DuplicatedUser');
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                password: hashedPassword,
                userID: args.userInput.userID,
                location: args.userInput.location,
                preferredGenres: args.userInput.preferredGenres
            });

            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        let user = null;
        if (email.includes('@')){
            user = await User.findOne({ email: email });
        }
        else{
            user = await User.findOne({userID: email});
        }
        if (!user) {
            console.log("could not find user");
            throw new Error('NoUser');
        }
        console.log("found user: ", user);
        let isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('NoPassword');
        }
        let token = jwt.sign(
            { userID: user.userID, email: user.email },
            'donghunjongsundayehyeonjoon',
            {
                expiresIn: '1h'
            }
        ); 
        
        return { firstName: user.firstName, email: email, preferredGenres: user.preferredGenres, userID: user.userID, token: token, tokenExpiration: 1, user_id: user.id};
    }
};

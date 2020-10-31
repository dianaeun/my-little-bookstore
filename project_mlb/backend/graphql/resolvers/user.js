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
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) 
                throw new Error('DuplicatedUser');
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = null;
        if (email.contains('@')){
            user = await User.findOne({ email: email });
        }
        else{
            user = await User.findOne({userId: email});
        }
        if (!user) {
            console.log("could not found user");
            throw new Error('NoUser');
        }

        console.log("found user: ", user);
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('NoPassword');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'donghunjongsundayehyeonjoon',
            {
                expiresIn: '1h'
            }
        ); 
        return { email: email, userId: user.id, token: token, tokenExpiration: 1};
    }
};

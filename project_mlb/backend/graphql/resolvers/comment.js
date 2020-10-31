const Comment = require('../../models/comment');

module.exports = {
    coments: async () => {
        try {
            const comments = await Comment.find();
            return comments.map(comment => {
                return transformComment(comment);
            })
        }
        catch(err){
            throw err;
        }
    },
};
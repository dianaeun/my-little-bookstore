const Discussion = require('../../models/discussion');
const Comment = require('../../models/comment');
const { transformComment } = require('./merge');
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
    createComment: async (args) => {
        const comment = new Comment({
            owner: args.commentInput.owner,
            discussion: args.commentInput.discussion,
            date: new Date(args.commentInput.date),
            content: args.commentInput.content
        });
        try{
            const result = await comment.save();
            const discussion = await Discussion.findById(args.commentInput.discussion);
            await Discussion.update({_id: discussion.id}, {$push: {comments: transformComment(result)}});
            console.log(discussion);
            return transformComment(result);
        }
        catch (err){
            throw err;
        }
    }
};
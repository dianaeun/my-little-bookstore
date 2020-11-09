const Discussion = require('../../models/discussion');
const { transformDiscussion, transformComment } = require('./merge');

module.exports = {
    discussions: async () => {
        try {
            const discussions = await Discussion.find();
            return discussions.map(discussion => {
                return transformDiscussion(discussion);
            })
        }
        catch(err){
            throw err;
        }
    },
    createDiscussion: async args => {
        try {
            const discussion = new Discussion({
                owner: args.discussionInput.owner,
                date: new Date(args.discussionInput.date),
                tag: args.discussionInput.tag,
                title: args.discussionInput.title,
                content: args.discussionInput.content,
                comments: [],
                likes: 0
            });

            const result = await discussion.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    updateLikes: async args => {
        try{
            const discussion = await Discussion.findById(args._id);
            await Discussion.update({_id: args._id}, {likes: discussion.likes + args.likes});
            return transformComment(discussion);
        }
        catch (err){
            throw err;
        }
    }
};
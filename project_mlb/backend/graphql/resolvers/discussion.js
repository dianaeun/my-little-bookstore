const Discussion = require('../../models/discussion');
const { transformDiscussion } = require('./merge');

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
                comments: args.discussionInput.comments,
                likes: 0
            });

            const result = await discussion.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
};
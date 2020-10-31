const userResolver = require('./user');
const bookResolver = require('./book');
const discussionResolver = require('./discussion');
const commentResolver = require('./comment');

const rootResolver ={
    ...userResolver,
    ...bookResolver,
    ...discussionResolver,
    ...commentResolver
};

module.exports = rootResolver;

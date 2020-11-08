const userResolver = require('./user');
const bookResolver = require('./book');
const discussionResolver = require('./discussion');
const commentResolver = require('./comment');
const requestResolver = require('./request');

const rootResolver ={
    ...userResolver,
    ...bookResolver,
    ...discussionResolver,
    ...commentResolver,
    ...requestResolver
};

module.exports = rootResolver;

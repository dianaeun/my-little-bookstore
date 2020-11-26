const userResolver = require('./user');
const bookResolver = require('./book');
const discussionResolver = require('./discussion');
const commentResolver = require('./comment');
const requestResolver = require('./request');
const reviewResolver = require('./review');
const ratingResolver = require('./rating');

const rootResolver ={
    ...userResolver,
    ...bookResolver,
    ...discussionResolver,
    ...ratingResolver,
    ...commentResolver,
    ...requestResolver,
    ...reviewResolver
};

module.exports = rootResolver;

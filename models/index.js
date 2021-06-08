// import User model
const User = require('./User');
// import Post model
const Post = require('./Post');
// import Vote model
const Vote = require('./Vote');
// require Comment model
const Comment = require('./Comment');

// define model associations
// create association demonstrating a user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// create reverse association demonstrating a post belongs to only one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// set up many-to-many relationships
// these methods allow User and Post models to query each other's info in context of a vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// create direct relationships between Post and Vote and User and Vote
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// create direct relationships between Comment and User, and Comment and Post
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// export User, Post objects with is as a property
module.exports = {
    User,
    Post,
    Vote,
    Comment
};
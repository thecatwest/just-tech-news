// import User model
const User = require('./User');
// import Post model
const Post = require('./Post');

// define model associations
// create association demonstrating a user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
}); 

// create reverse association demonstrating a post belongs to only one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// export User, Post objects with is as a property
module.exports = { User, Post };
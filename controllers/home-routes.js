// set up homepage route
const router = require('express').Router();

// import modules and models
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            // pass a single post object into the homepage template
            // use res.render() instead of res.send() or res.sendFile() to render homepage.handlebars template
            // second argument is an object which contains all data to pass to the template
            console.log(dbPostData[0]);
            // must serialize the data because res.render() method does not auto serialize data like res.json()
            // loop over and map each Sequelize object into a serialized version, save results in new posts array
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // add array to an object so it can be passed into res.render() method and be updated with new properties later
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
// use Express.js router to keep routes organized
const router = require("express").Router();
const {
  User,
  Post,
  Vote
} = require("../../models");

// 5 routes for CRUD ops
// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  // findAll() = JavaScript's SELECT * FROM ;
  User.findAll({
      // provide attributes key and instruct query to exclude the password column
      attributes: {
        exclude: ["password"]
      },
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  // use .findOne() to search User object
  User.findOne({
    attributes: {
      exclude: ['password']
    },
    where: {
      id: req.params.id
    },
    include: [{
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  // query User table using findOne() method for email entered by user and assign
  // to req.body.email
  User.findOne({
    where: {
      email: req.body.email
    }
    // package user data as new variable, use in callback fn 
  }).then(dbUserData => {
    // if no matching user email is found, return error
    if (!dbUserData) {
      res.status(400).json({
        message: 'No user with that email address!'
      });
      return;
    }
    // if matching user is found, respond with user info in json
    res.json({
      user: dbUserData
    });

    // Verify user
    // call instance method on user retrieved from db. Because instance method is boolean, can use in a conditional statement to verify user verification
    const validPassword = dbUserData.checkPassword(req.body.password);

    // if match returns false value, error message is thrown and return statements exits fn
    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect password!'
      });
      return;
    }

    res.json({
      user: dbUserData,
      message: 'You are now logged in!'
    });
  });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({
          message: "No user found with this id"
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          message: "No user found with this id"
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
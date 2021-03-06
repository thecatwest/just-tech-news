// collect packaged group of API endpoints and prefix them with /api path

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// second use of router.use() to handle any endpoint requests that don't exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
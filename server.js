// imports
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);



// turn on connection to db and server using .sync() (sync means Sequelize is taking models and connecting them to associated db tables)
// use of {force: false} prevents dropping and recreating of database tables on startup (code works either way)
// use of {force: true} forces db connection to sync with model definitions and associations, forcing the tables to re-create if any associations change
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
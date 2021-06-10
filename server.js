// imports
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// set up Handlebars.js as app's template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);



// turn on connection to db and server using .sync() (sync means Sequelize is taking models and connecting them to associated db tables)
// use of {force: false} prevents dropping and recreating of database tables on startup (code works either way)
// use of {force: true} forces db connection to sync with model definitions and associations, forcing the tables to re-create if any associations change
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
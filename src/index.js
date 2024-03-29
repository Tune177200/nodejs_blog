const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const handlebars = require('express-handlebars');
const port = 3000;

const route = require('./routes');
const db = require('./config/db/index');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// app.use(morgan('combined'))

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

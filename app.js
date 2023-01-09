const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const _ = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb - 2 - Cloud
const dbURI = 'mongodb://localhost:27017/node-tuts';
async function connect() {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

// register view engine
app.set('view engine', 'ejs');


// listen for requests
app.listen(3000, () => {
    console.log('Server started');
});

// 3rd party middleware (replacing the top middleware)
app.use(morgan('dev'));

// middleware & static files
app.use(express.static('public'));

// Adding data into the database 
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: ' Marvel',
//         snippet: 'Ant Man',
//         body: 'Date of release is out. subscribe for more..'
//     });

//     blog.save()
//         .then((result) => {
//             res.render(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// })

// middleware for the post request
app.use(express.urlencoded({ extended : true }));

// blog routes
app.use(blogRoutes);


// 404 page - middleware
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
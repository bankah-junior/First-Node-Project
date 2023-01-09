const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

// Responding
router.get('/', (req, res) => {
    res.redirect('/blogs');
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/blogs/create', blogController.blog_create_get);


// Routing blog
router.get('/blogs', blogController.blog_index)

// Creating a post handler
router.post('/blogs', blogController.blog_create_post);

// Selecting a blog by id
router.get('/blogs/:id', blogController.blog_details);

// Deleting a blog by id
router.delete('/blogs/:id', blogController.blog_delete);


module.exports = router;

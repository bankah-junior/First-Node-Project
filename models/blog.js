const mongoose = require('mongoose');
// creating a table for the database
const Schema = mongoose.Schema;

// creating an instance of the table
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

// exporting this module so that it can be used elsewhere
module.exports = Blog;
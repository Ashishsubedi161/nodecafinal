const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    content: {
        type: String,
        required: 'This field is required.'
    },
    price: {
        type: Number,
        required: 'This field is required.'
    }
}, {
    timestamps: true
});




mongoose.model('Job', jobSchema);
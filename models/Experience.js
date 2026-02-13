const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title']
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    location: String,
    from: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    to: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
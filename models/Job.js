const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined', 'offered'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    companyName: {
        type: String,
        required: [true, 'Please add a company name']
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
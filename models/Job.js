const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'You must provide a company name!'],
        maxlength: 40
    },

    position: {
        type: String,
        required: [true, 'You must provide a position'],
        maxlength: 75,
    },

    status: {
        type: String,
        enum: ['pending', 'interview', 'declined', 'offer'],
        default: 'pending',
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user!'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
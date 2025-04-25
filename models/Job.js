const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
    },

    status: {
        type: String,
        enum: {
            values: ['pending', 'interview', 'declined'],
            message: 'Invalid value for status. You can choose from pending, interview and declined',
        },
        required: [true, 'Status is required'],
    },
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;

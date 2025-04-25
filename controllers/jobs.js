const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');

exports.getAllJobs = catchAsync(async (req, res, next) => {
    const jobs = await Job.find();
    res.status(StatusCodes.OK).json({ status: 'success', jobs });
});

exports.getJob = catchAsync(async (req, res, next) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ status: 'fail', message: `No job with ID: ${req.params.id} found` });
    }

    res.status(StatusCodes.OK).json({ status: 'success', job });
});

exports.createJob = catchAsync(async (req, res, next) => {
    const newJob = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ status: 'success', newJob });
});

exports.updateJob = catchAsync(async (req, res, next) => {
    const job = await job.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    if (!job) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ status: 'fail', message: `No job with ID: ${req.params.id} found` });
    }

    res.status(StatusCodes.OK).json({ status: 'success', job });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
    const job = await job.findByIdAndDelete();
    if (!job) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ status: 'fail', message: `No job with ID: ${req.params.id} found` });
    }

    res.status(StatusCodes.NO_CONTENT);
});

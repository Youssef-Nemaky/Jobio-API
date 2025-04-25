const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const Job = require('../models/Job');
const { NotFoundError, ForbiddenError } = require('../errors');

exports.getAllJobs = catchAsync(async (req, res, next) => {
    const jobs = await Job.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', jobs });
});

exports.getJob = catchAsync(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return next(new NotFoundError(`No job with ID: ${req.params.id} found`));
    }

    //check the if the user is authorized to get this resoruce (owner or not)
    if (job.user !== req.user.userId) {
        return next(new ForbiddenError('You do not have access to perform this action'));
    }

    res.status(StatusCodes.OK).json({ status: 'success', job });
});

exports.createJob = catchAsync(async (req, res, next) => {
    const newJob = await Job.create({ ...req.body, user: req.user.userId });

    res.status(StatusCodes.CREATED).json({ status: 'success', newJob });
});

exports.updateJob = catchAsync(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    //check if the document is present
    if (!job) {
        return next(new NotFoundError(`No job with ID: ${req.params.id} found`));
    }

    //check the if the user is authorized to get this resoruce (owner or not)
    if (job.user != req.user.userId) {
        return next(new ForbiddenError('You do not have access to perform this action'));
    }

    //update the document
    Object.assign(job, req.body);
    await job.save(); // will run the validators automatically

    //send the response
    res.status(StatusCodes.OK).json({ status: 'success', job });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    //check if the document is present
    if (!job) {
        return next(new NotFoundError(`No job with ID: ${req.params.id} found`));
    }

    //check the if the user is authorized to get this resoruce (owner or not)
    if (job.user != req.user.userId) {
        return next(new ForbiddenError('You do not have access to perform this action'));
    }

    //delete the document
    await job.deleteOne();

    //send the response
    res.status(StatusCodes.NO_CONTENT).json({ status: 'success' });
});

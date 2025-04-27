const express = require('express');

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');
const checkOwnership = require('../middleware/checkOwnership');
const Job = require('../models/Job');

const jobsRouter = express.Router();

jobsRouter.route('/').get(getAllJobs).post(createJob);

jobsRouter.use('/:id', checkOwnership(Job, 'job'));
jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;

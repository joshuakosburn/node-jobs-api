const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const createJob = async (req, res) => {
    // We're linking a job to a certain user
    // account so we need to set the userID
    // on the req.body so we can access it
    // when we access the other data on req.body
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const getJob = async (req, res) => {
    const { user: { userID }, params: { id: jobID } } = req;

    const job = await Job.findOne({ createdBy: userID });


    res.json({ job });
}

const updateJob = async (req, res) => {
    res.send('updateJob');
}

const deleteJob = async (req, res) => {
    res.send('deleteJob');
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
};
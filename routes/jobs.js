const express = require('express');
const router = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

// We don't need the ID so getting all the jobs and
// creating a job will work with root
router.route('/')
.get(getAllJobs)
.post(createJob);

// We need the ID here so we can get, update,
// and delete a specific job.
router.route('/:id')
.get(getJob)
.patch(updateJob)
.delete(deleteJob);

module.exports = router;
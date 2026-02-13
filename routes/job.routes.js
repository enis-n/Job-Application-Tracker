const express = require('express');
const router = express.Router();
const { addJob, getJobs, updateJob, deleteJob, getStats, getJob } = require('../controllers/job.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', addJob);
router.get('/', getJobs);

router.get('/stats', getStats);


router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

router.get('/:id', getJob);

module.exports = router;
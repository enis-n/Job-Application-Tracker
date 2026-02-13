const jobService = require('../services/job.service');

exports.addJob = async (req, res) => {
    try {
        const job = await jobService.createJob(req.body, req.user.id);
        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await jobService.updateJob(req.params.id, req.user.id, req.body);
        if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await jobService.deleteJob(req.params.id, req.user.id);
        if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await jobService.getUserJobs(req.user.id);
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.getStats = async (req, res) => {
    try {
        const stats = await jobService.getJobStats(req.user.id);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getJob = async (req, res) => {
    try {
        const job = await jobService.getSingleJob(req.params.id, req.user.id);
        if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
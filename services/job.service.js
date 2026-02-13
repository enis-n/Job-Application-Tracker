const mongoose = require('mongoose');
const Job = require('../models/Job');

exports.createJob = async (jobData, userId) => {
    jobData.user = userId;
    return await Job.create(jobData);
};


exports.updateJob = async (jobId, userId, updateData) => {
    return await Job.findOneAndUpdate(
        { _id: jobId, user: userId },
        updateData,
        { new: true, runValidators: true }
    );
};


exports.deleteJob = async (jobId, userId) => {
    return await Job.findOneAndDelete({ _id: jobId, user: userId });
};

exports.getUserJobs = async (userId) => {
    return await Job.find({ user: userId }).sort('-createdAt');
};

exports.getJobStats = async (userId) => {
    const stats = await Job.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const formattedStats = stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    return formattedStats;
};

exports.getSingleJob = async (jobId, userId) => {
    return await Job.findOne({ _id: jobId, user: userId });
};
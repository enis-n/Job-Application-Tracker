const Experience = require('../models/Experience');

exports.addExperience = async (expData, userId) => {
    expData.user = userId;
    return await Experience.create(expData);
};

exports.getExperiences = async (userId) => {
    return await Experience.find({ user: userId }).sort('-from');
};

exports.deleteExperience = async (expId, userId) => {
    return await Experience.findOneAndDelete({ _id: expId, user: userId });
};
const experienceService = require('../services/experience.service');

exports.createExperience = async (req, res) => {
    try {
        const experience = await experienceService.addExperience(req.body, req.user.id);
        res.status(201).json({ success: true, data: experience });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getExperiences = async (req, res) => {
    try {
        const experiences = await experienceService.getExperiences(req.user.id);
        res.status(200).json({ success: true, data: experiences });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const exp = await experienceService.deleteExperience(req.params.id, req.user.id);
        if (!exp) return res.status(404).json({ success: false, error: 'Experience not found' });
        res.status(200).json({ success: true, message: 'Experience removed' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
const express = require('express');
const router = express.Router();
const { createExperience, getExperiences, deleteExperience } = require('../controllers/experience.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createExperience);
router.get('/', getExperiences);
router.delete('/:id', deleteExperience);

module.exports = router;
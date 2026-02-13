const express = require('express');
const router = express.Router();
const { addCompany, getCompanies, updateCompany, deleteCompany } = require('../controllers/company.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', addCompany);
router.get('/', getCompanies);

router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
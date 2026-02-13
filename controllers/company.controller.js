const companyService = require('../services/company.service');

exports.addCompany = async (req, res) => {
    try {
        const company = await companyService.createCompany(req.body, req.user.id);
        res.status(201).json({ success: true, data: company });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getCompanies = async (req, res) => {
    try {
        const companies = await companyService.getCompanies(req.user.id);
        res.status(200).json({ success: true, data: companies });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const company = await companyService.updateCompany(req.params.id, req.user.id, req.body);
        if (!company) return res.status(404).json({ success: false, error: 'Company not found' });

        res.status(200).json({ success: true, data: company });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const company = await companyService.deleteCompany(req.params.id, req.user.id);
        if (!company) return res.status(404).json({ success: false, error: 'Company not found' });

        res.status(200).json({ success: true, message: 'Company deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
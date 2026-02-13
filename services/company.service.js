const Company = require('../models/Company');

exports.createCompany = async (companyData, userId) => {
    companyData.user = userId;
    return await Company.create(companyData);
};

exports.getCompanies = async (userId) => {
    return await Company.find({ user: userId });
};


exports.updateCompany = async (companyId, userId, updateData) => {
    return await Company.findOneAndUpdate(
        { _id: companyId, user: userId },
        updateData,
        { new: true, runValidators: true }
    );
};


exports.deleteCompany = async (companyId, userId) => {
    return await Company.findOneAndDelete({ _id: companyId, user: userId });
};
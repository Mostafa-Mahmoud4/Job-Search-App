const Company = require('../models/companyModel');
const User = require('../models/userModel');
const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

const addCompany = async (req, res, next) => {
    const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;
    const companyHR = req.user._id;
    const company = new Company({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR,
    });
    await company.save();
    res.status(201).json({ message: 'Company added successfully', company });
};

const updateCompany = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const company = await Company.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Company updated successfully', company });
};

const deleteCompany = async (req, res, next) => {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.status(200).json({ message: 'Company deleted successfully' });
};

const getCompany = async (req, res, next) => {
    const { id } = req.params;
    const company = await Company.findById(id).populate('companyHR');
    res.status(200).json({ company });
};



const searchCompany = async (req, res) => {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Company name must be provided and must be a string' });
    }

    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex

    const companies = await Company.find({ companyName: { $regex: regex } });

    res.status(200).json(companies);
};

const getApplicationsForJob = async (req, res) => {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId }).populate('userId');
    res.status(200).json({ applications });
};

module.exports = { addCompany, updateCompany, deleteCompany, getCompany, searchCompany, getApplicationsForJob };

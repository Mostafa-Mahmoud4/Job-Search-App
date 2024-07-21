const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

const addJob = async (req, res, next) => {
    const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills, companyId } = req.body;
    const addedBy = req.user._id;
    const job = new Job({
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy,
        companyId,
    });
    await job.save();
    res.status(201).json({ message: 'Job added successfully', id: job._id, job });
};

const updateJob = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const job = await Job.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'Job updated successfully', job });
};

const deleteJob = async (req, res, next) => {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted successfully' });
};

const getAllJobs = async (req, res, next) => {
    const jobs = await Job.find().populate('companyId');
    res.status(200).json({ jobs });
};

const getJobsByCompany = async (req, res, next) => {
    const { companyId } = req.params;
    console.log(companyId)
    const jobs = await Job.find({ companyId }).populate('addedBy');
    res.status(200).json({ jobs });
};

const getFilteredJobs = async (req, res, next) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const filter = {};
    if (workingTime) filter.workingTime = workingTime;
    if (jobLocation) filter.jobLocation = jobLocation;
    if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
    if (jobTitle) filter.jobTitle = jobTitle;
    if (technicalSkills) filter.technicalSkills = { $in: technicalSkills };
    const jobs = await Job.find(filter).populate('addedBy');
    res.status(200).json({ jobs });
};

const applyToJob = async (req, res, next) => {
    const { jobId,  userTechSkills, userSoftSkills, userResume } = req.body;
    const userId = req.user._id;
    console.log(userId)
    const application = new Application({
        jobId,
        userId,
        userTechSkills,
        userSoftSkills,
        userResume,
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
};

module.exports = { addJob, updateJob, deleteJob, getAllJobs, getJobsByCompany, getFilteredJobs, applyToJob };

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { errorHandle } = require('../middlewares/errorHandler');
const { validationMiddleware } = require('../middlewares/validation');
const { jobSchema, updateJobValidation } = require('../validators/jobValidation');
const { applicationSchema } = require('../validators/applicationValidation');
const { addJob, updateJob, deleteJob, getAllJobs, getJobsByCompany, getFilteredJobs, applyToJob } = require('../controllers/jobController');

/**
 * Route to add a new job.
 * @route POST /
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing job details.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.post('/', authenticate, authorize('Company_HR'), validationMiddleware({ body: jobSchema }), errorHandle(addJob));

/**
 * Route to update an existing job.
 * @route PUT /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing updated job details.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.put('/:id', authenticate, authorize('Company_HR'), validationMiddleware({ body: updateJobValidation }), errorHandle(updateJob));

/**
 * Route to delete a job.
 * @route DELETE /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing the job ID.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.delete('/:id', authenticate, authorize('Company_HR'), errorHandle(deleteJob));

/**
 * Route to get all jobs.
 * @route GET /
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'User' or 'Company_HR' role.
 * @param {object} req - The request object.
 * @param {object} res - The response object containing a list of jobs.
 * @param {function} next - The next middleware function.
 */
router.get('/', authenticate, authorize(['User', 'Company_HR']), errorHandle(getAllJobs));

/**
 * Route to get jobs by company ID.
 * @route GET /company/:companyId
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'User' or 'Company_HR' role.
 * @param {object} req - The request object containing the company ID.
 * @param {object} res - The response object containing a list of jobs for the specified company.
 * @param {function} next - The next middleware function.
 */
router.get('/company/:companyId', authenticate, authorize(['User', 'Company_HR']), errorHandle(getJobsByCompany));

/**
 * Route to get filtered jobs based on query parameters.
 * @route GET /filter
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'User' or 'Company_HR' role.
 * @param {object} req - The request object containing query parameters for filtering jobs.
 * @param {object} res - The response object containing a list of filtered jobs.
 * @param {function} next - The next middleware function.
 */
router.get('/filter', authenticate, authorize(['User', 'Company_HR']), errorHandle(getFilteredJobs));

/**
 * Route for a user to apply for a job.
 * @route POST /apply
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'User' role.
 * @param {object} req - The request object containing application details.
 * @param {object} res - The response object confirming the application submission.
 * @param {function} next - The next middleware function.
 */
router.post('/apply', authenticate, authorize('User'), validationMiddleware({ body: applicationSchema }), errorHandle(applyToJob));

module.exports = router;

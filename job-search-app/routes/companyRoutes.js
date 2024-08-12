const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { errorHandle } = require('../middlewares/errorHandler');
const { validationMiddleware } = require('../middlewares/validation');
const { addCompany, updateCompany, deleteCompany, getCompany, searchCompany, getApplicationsForJob } = require('../controllers/companyController');
const { companySchema, updateCompanyValidation } = require('../validators/companyValidation');

/**
 * Route to add a new company.
 * @route POST /
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing company details.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.post('/', authenticate, authorize('Company_HR'), validationMiddleware({ body: companySchema }), errorHandle(addCompany));

/**
 * Route to update an existing company.
 * @route PUT /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing updated company details.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.put('/:id', authenticate, authorize('Company_HR'), validationMiddleware({ body: updateCompanyValidation }), errorHandle(updateCompany));

/**
 * Route to delete a company.
 * @route DELETE /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing the company ID.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.delete('/:id', authenticate, authorize('Company_HR'), errorHandle(deleteCompany));

/**
 * Route to get a specific company by ID.
 * @route GET /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the company ID.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.get('/:id', authenticate, errorHandle(getCompany));

/**
 * Route to search for companies.
 * @route GET /
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' or 'User' role.
 * @param {object} req - The request object containing search parameters.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.get('/', authenticate, authorize(['Company_HR', 'User']), errorHandle(searchCompany));

/**
 * Route to get applications for a specific job.
 * @route GET /:jobId/applications
 * @middleware authenticate - Ensures the user is authenticated.
 * @middleware authorize - Ensures the user has 'Company_HR' role.
 * @param {object} req - The request object containing the job ID.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.get('/:jobId/applications', authenticate, authorize('Company_HR'), errorHandle(getApplicationsForJob));

module.exports = router;

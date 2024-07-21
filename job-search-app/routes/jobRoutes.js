const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { errorHandle } = require('../middlewares/errorHandler');
const { validationMiddleware } = require('../middlewares/validation');
const { jobSchema, updateJobValidation } = require('../validators/jobValidation');
const {applicationSchema} = require('../validators/applicationValidation')
const { addJob, updateJob, deleteJob, getAllJobs, getJobsByCompany, getFilteredJobs, applyToJob } = require('../controllers/jobController');

router.post('/', authenticate, authorize('Company_HR'), validationMiddleware({ body: jobSchema }), errorHandle(addJob));
router.put('/:id', authenticate, authorize('Company_HR'), validationMiddleware({ body: updateJobValidation }), errorHandle(updateJob));
router.delete('/:id', authenticate, authorize('Company_HR'), errorHandle(deleteJob));
router.get('/', authenticate, authorize(['User', 'Company_HR']), errorHandle(getAllJobs));
router.get('/company/:companyId', authenticate, authorize(['User', 'Company_HR']), errorHandle(getJobsByCompany));
router.get('/filter', authenticate, authorize(['User', 'Company_HR']), errorHandle(getFilteredJobs));
router.post('/apply', authenticate, authorize('User'), validationMiddleware({ body: applicationSchema }), errorHandle(applyToJob));

module.exports = router;

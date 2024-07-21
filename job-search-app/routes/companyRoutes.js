const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { errorHandle } = require('../middlewares/errorHandler');
const { validationMiddleware } = require('../middlewares/validation');
const { addCompany, updateCompany, deleteCompany, getCompany, searchCompany, getApplicationsForJob } = require('../controllers/companyController');
const { companySchema, updateCompanyValidation } = require('../validators/companyValidation');

router.post('/', authenticate, authorize('Company_HR'), validationMiddleware({ body: companySchema }), errorHandle(addCompany));
router.put('/:id', authenticate, authorize('Company_HR'), validationMiddleware({ body: updateCompanyValidation }), errorHandle(updateCompany));
router.delete('/:id', authenticate, authorize('Company_HR'), errorHandle(deleteCompany));
router.get('/:id', authenticate, errorHandle(getCompany));
router.get('/', authenticate, authorize(['Company_HR', 'User']), errorHandle(searchCompany));
router.get('/:jobId/applications', authenticate, authorize('Company_HR'), errorHandle(getApplicationsForJob));

module.exports = router;

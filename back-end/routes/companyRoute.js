const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');


router.post('/', companyController.addCompany);

router.get('/', companyController.getAllCompanies);

router.get('/:id', companyController.getCompanyById);

router.get('/search/filter',companyController.filterCompanies);

module.exports = router;

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/:companyId', reviewController.addReview);

router.get('/:companyId/', reviewController.getCompanyReviews);

module.exports = router;

const Company = require('../models/companyModel');
const Review = require('../models/reviewModel');

exports.addReview = async (req, res) => {
    try {
        console.log("hitting")
        const { fullName, subject, reviewText, rating } = req.body;
        const review = new Review({ fullName, subject, reviewText, rating });
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        company.reviews.push(review);
        await  review.save();
        
        await company.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(400).json({ message: 'Error adding review', error });
    }
};

exports.getCompanyReviews = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

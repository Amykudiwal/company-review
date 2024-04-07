const Company = require('../models/companyModel');
exports.addCompany = async (req, res) => {
    try {
        const { name, location, description,foundedOn, city, companyLogo } = req.body;
        const company = new Company({ name, location,description ,foundedOn, city, companyLogo });
        await company.save();
        res.status(201).json({ message: 'Company added successfully', company });
    } catch (error) {
        res.status(400).json({ message: 'Error adding company', error });
    }
};

// Fetch all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; 
        const company = await Company.findById(companyId);
        
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error });
    }
};

// Filter companies by specific criteria
exports.filterCompanies = async (req, res) => {
    try {
        
        const { name } = req.query;
        const regex = new RegExp(name, 'i'); 
        
      
        const filteredCompanies = await Company.find({ name: regex });
        
        res.status(200).json(filteredCompanies);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering companies', error });
    }
};

const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    name: String,
    location: String,
    description:String,
    foundedOn: Date,
    city: String,
    companyLogo: String, 
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});
module.exports = mongoose.model('Company', companySchema);

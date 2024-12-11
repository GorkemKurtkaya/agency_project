import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PortfolioSchema = new Schema({
    title: { type: String, required: true },
    projectName: { type: String, required: true },
    projectAlt: { type: String, required: true },
    projectDescription: { type: String, required: true },
    image: { type: String, required: true },
    client: { type: String, required: true },
    category: { type: String, required: true },

}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;

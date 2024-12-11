import Portfolio from "../models/portfoliomodel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const createPortfolio = async (req, res) => {
    try {

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No file uploaded" });
        }
  
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: "AgencyPortfolio"
        });

        const { title, projectName, projectAlt, projectDescription, image, client, category } = req.body;

        const newPortfolio = new Portfolio({
            title: title,
            projectName: projectName,
            projectAlt: projectAlt,
            projectDescription: projectDescription,
            image: result.secure_url,
            client: client,
            category:category
        });

        await newPortfolio.save();
        res.status(201).json(newPortfolio);

        fs.unlinkSync(req.files.image.tempFilePath);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getAllPortfolio = async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).render('index', {
            link: "portfolio",
            portfolios: portfolios
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updatePortfolio = async (req, res) => {
    try {
        const { title, projectName, projectAlt, projectDescription, image, client, category } = req.body;

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, {
            title: title,
            projectName: projectName,
            projectAlt: projectAlt,
            projectDescription: projectDescription,
            image: image,
            client: client,
            category:category
        }, { new: true });

        res.status(200).json(updatedPortfolio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deletePortfolio = async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Portfolio deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}





export{ createPortfolio, getAllPortfolio, getPortfolio, updatePortfolio, deletePortfolio };
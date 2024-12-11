import express from 'express';
import * as pageController from '../controllers/pageController.js';
import * as portfolioController from '../controllers/portfolioController.js';



const router = express.Router();

router.get("/", portfolioController.getAllPortfolio);


router.get('/', pageController.getIndexPage);



export default router;
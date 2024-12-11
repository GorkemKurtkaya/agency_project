import express from 'express';
import * as portfolioController from '../controllers/portfolioController.js';


const router = express.Router();

router.post('/', portfolioController.createPortfolio);
router.get('/', portfolioController.getAllPortfolio);
router.get('/:id', portfolioController.getPortfolio);
router.put('/:id', portfolioController.updatePortfolio);
router.delete('/:id', portfolioController.deletePortfolio);




export default router;
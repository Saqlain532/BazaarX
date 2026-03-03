import express from 'express';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, ProductById, ProductList } from '../controllers/productController.js';
import authSeller from '../middlewares/authSeller.js';



const productRouter = express.Router ();

productRouter.post('/add',authSeller, upload.array("images"),  addProduct);
productRouter.get('/list', ProductList);
productRouter.get('/id', ProductById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
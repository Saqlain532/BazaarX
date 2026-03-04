import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routers/userRoute.js';
import sellerRouter from './routers/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routers/productRoute.js';
import cartRouter from './routers/cartRoute.js';
import addressRouter from './routers/addressRoute.js';
import orderRouter from './routers/orderRoute.js';
import { stripeWebhooks } from './controllers/OrderController.js';

const app = express();
const port = process.env.PORT || 4000;
await connectDB();
await connectCloudinary();

//Allow multiple origins

const allowedOrigins = ['http://localhost:5173', 'https://bazaar-x-frontend-gold.vercel.app'];

app.post('/stripe', express.raw({type:'application/json'}),stripeWebhooks)



//Middleware configuration 

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins, credentials : true}))

app.get('/', (req, res) => res.send("API is working "));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
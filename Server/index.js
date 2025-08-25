import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorManager from './Middlewares/errorHandler.js';
import Route from './Routes/route.js';
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.MONGOOSE_CONNECTIONSTRING)
.then(()=>console.log('Db connected sucessfully'))
.catch((error)=>console.log(error))
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api',Route)

app.use(errorManager)
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

import express from 'express';
import { link } from 'fs';
import conn from "./db.js";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import portfolioRoute from "./routes/portfolioRoute.js";
import pageRoute from "./routes/pageRoute.js";


conn();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');

app.use(express.static('public'));




app.use(express.static('public'));
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
// app.use(methodOverride('_method', {
//   methods: ['POST', 'GET']
// }));



app.use("/",pageRoute);
app.use("/portfolio",portfolioRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
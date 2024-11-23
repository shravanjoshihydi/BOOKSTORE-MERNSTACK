import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware to handle cors policy
// Option 1 : Allow all origins with default of cors(*)
// app.use(cors());
// Option 2 : custom origins
app.use(cors({
    origin: 'https://bookstore-mernstack.vercel.app/',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}))

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack');
});

app.use('/books', booksRoutes);

//connect to database
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port : ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
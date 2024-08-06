import express from 'express';
import { PORT, mongoURL } from "./config.js"
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import leagueRouter from './routes/league.routes.js';
import cors from 'cors';



const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());



app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
  });

app.use('/users', userRouter);
app.use('/leagues', leagueRouter);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });




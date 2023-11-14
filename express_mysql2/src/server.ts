import mysql from 'mysql2/promise';
import apiRouter from './routes'

import express from 'express';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);



const PORT =  4000;
app.listen(PORT, () => console.log(`🚀 Server started at http://localhost:${PORT}`));

  
  



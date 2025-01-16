import 'dotenv/config';
import { app } from './app.js';
import mongoose from 'mongoose';

async function start() {

  const port = process.env.PORT;

  if(!(process.env.PORT)) {
     throw new Error('Port must be defined!!');
  }
  if(!(process.env.JWT_SECRET_KEY)) {
   throw new Error('JWT Secret Key must be defined!!');
}
  if(!process.env.MONGO_DB_URI) {
    throw new Error('Mongo DB URL must be defined!!');
  }

 try {
    await mongoose.connect(process.env.MONGO_DB_URI)
 } catch (error) {
    console.log('Error in connecting mongodb -> ', error);
 }

  // Node-Express server is up on below port
  app.listen(port, () => {
      console.log(`Express server is up on ${ port }`);
  });

}

start();
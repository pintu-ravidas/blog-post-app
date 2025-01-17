import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const currentUser = function(req, res, next) {

    console.log('session jwt ', req.session.jwt)
    if(!req.session?.jwt) {
       console.log('req.currentUser 1', req.currentUser )
       return next();
    }
 
   // console.log('process.env.JWT_SECRET_KEY ', process.env.JWT_SECRET_KEY)
  
   try {
     const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_SECRET_KEY
     );
  
     req.currentUser = payload;
 
     console.log('req.currentUser ', req.currentUser )
 
   } catch (error) {
    console.log('error ', error )
    //throw new Error(error)
   }
 
   next();
 };
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const currentUser = function(req, res, next) {

    console.log('session jwt currentUser ->', req.session.jwt);
    if(!req.session?.jwt) {
       return next();
    }
 
   // console.log('process.env.JWT_SECRET_KEY ', process.env.JWT_SECRET_KEY)
  
   try {
     const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_SECRET_KEY
     );
  
     req.currentUser = {userId: payload.userId, email: payload.email };
 
   } catch (error) {
    console.log('error currentUser -> ', error )
    //throw new Error(error)
   }
 
   next();
 };
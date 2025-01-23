import express from 'express';
const router = express.Router();
import { User } from '../../models/User.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

router.post('/api/user/signup',
     [
        body('email').notEmpty().isEmail().withMessage('Invalid email id'),
        body('password').notEmpty().isLength({ min: 5}).withMessage('Password must be 5 character long')
     ],
     async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;
    //const hasedPwd = await hashPassword(password); // hashing the password
    const user = new User({ email, password });
    await user.save();

    // Generate JWT token 
    const userJWT = jwt.sign(
        { // user data
            userId: user.id,
            email
        },
        process.env.JWT_SECRET_KEY, // JWT secret key
        {
            expiresIn: '50min' // expiry time
        }
    );

    console.log('JWT signup -> ', userJWT)
    // store it on session object
    req.session = {
        jwt: userJWT
    };
    
    res.send({ user, userJWT });

});


export { router as userSignupRoutes };

import express from 'express';
const router = express.Router();
import { User } from '../../models/User.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


router.post('/api/user/signin',
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
    const user = await User.findOne({ email });

    console.log('user -> signin ',  user);
    

    if(!user) {
        return res.status(401).send({
            errors: [{"msg": "Invalid user!!"}]
        });
    }

    const isVerified = await bcrypt.compare(password, user.password);
    // if user entered and db store password same
    if(isVerified) {
         // Generate JWT token 
        const userJWT = jwt.sign(
            { // user data
                userId: user.id,
                email
            },
            process.env.JWT_SECRET_KEY, // JWT secret key
            {
                expiresIn: process.env.JWT_EXPIRES_IN // expiry time
            }
        );

    // store it on session object
    req.session = {
        jwt: userJWT
    };

    // req.cookie("session", userJWT, {
    //     httpOnly: false
    // });


    res.send({ user, userJWT });

    }else {
        res.send({
            message: "Invalid credentials"
        })
    }
    
});


export { router as userSigninRoutes };
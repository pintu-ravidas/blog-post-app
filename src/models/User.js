import mongoose, { version } from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }, 
  },   
   {
        toJSON: {
            transform: function(doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
                return ret;
            }
        }
   }
    
);


UserSchema.pre('save', async function (next) {
    try {
        const salt = 10;
        if(this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, salt);
        } 
        next();  
    } catch (error) {
        
    }
});

const User = mongoose.model('User', UserSchema);

export { User };
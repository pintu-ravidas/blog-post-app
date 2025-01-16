import mongoose, { version } from 'mongoose';

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

const User = mongoose.model('User', UserSchema);

export { User };
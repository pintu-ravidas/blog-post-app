import mongoose from 'mongoose';
//import { Comment } from './Comment';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    comments: [      {

        commentId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment',
            required: true
        }
        
    }, 
    {
        title: {
            type: String,
            required: true
        }
    }], 
    },
    {
        toJSON: {
            transform: function(doc, ret) {
                ret.postId = ret._id;
                delete ret.__v;
                delete ret._id;
                return ret;
            }
        }
   }
    
);

const Post = mongoose.model('Post', PostSchema);

export { Post };
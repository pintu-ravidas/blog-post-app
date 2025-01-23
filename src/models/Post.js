import mongoose from 'mongoose';
//import { Comment } from './Comment';

const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    commentId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment',
            required: true
    },
},
{
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id;
            return ret;
        }
    }
}
);

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    comments: [CommentSchema], 
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
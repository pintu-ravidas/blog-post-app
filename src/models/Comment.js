import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        toJSON: {
            transform: function(doc, ret) {
                ret.commentId = ret._id;
                delete ret.__v;
                delete ret._id;
                return ret;
            }
        }
   }
  );

const Comment = mongoose.model('Comment', CommentSchema);

export { Comment };
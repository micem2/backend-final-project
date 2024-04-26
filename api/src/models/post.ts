import { Document, Schema, Model, model } from 'mongoose';

interface IPost extends Document {
    name: string;
    description: string;
}

const postSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    }
});

const Post = model<IPost>('Post', postSchema);

export { IPost, Post };
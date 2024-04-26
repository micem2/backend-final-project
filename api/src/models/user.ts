import { Document, Schema, Model, model } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    country: string;
    gender: string;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const User = model<IUser>('User', userSchema);

export { IUser, User };
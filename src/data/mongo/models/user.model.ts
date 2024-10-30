
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name is required'],
    },

    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    }
});

export const UserModel = mongoose.model('User', UserSchema);
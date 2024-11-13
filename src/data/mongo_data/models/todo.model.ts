

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required'],
    },

    description: {
        type: String,
    },

    date:{
        type: Date,
    },

    isCompleted:{
        type: Boolean,
        default: false,
    },

});


export const TodoModel = mongoose.model('Todo', TodoSchema);
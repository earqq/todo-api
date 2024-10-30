

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    description: {
        type: String,
        required: [true, 'Description is required'],
    },

    dueDate:{
        type: Date,
    },

    isCompleted:{
        type: Boolean,
        default: false,
    },

})

export const TaskModel = mongoose.model('Task', taskSchema);
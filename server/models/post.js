import mongoose from "mongoose";

const Post = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    text: {type: String, required: true},
    image: {type: String, default: ''},
    username: {type: String, required: true},
    views: {type: Number, default: 0},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

export default mongoose.model('Post', Post)
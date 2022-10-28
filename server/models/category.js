import mongoose from "mongoose";

const Category = new mongoose.Schema({
    name: {type: String, required:true, unique: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

export default mongoose.model('Category', Category)
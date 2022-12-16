import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        
        res.status(200).json(postMessages); // 200: OK

    } catch (error) {
        res.status(404).json({ message: error.message });   // 404: Not Found
    }
}
/*
status is a method of the response object. It sets the HTTP status for the response.
*/
export const createPost = (req, res) => {
    
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        newPost.save();
        res.status(201).json(newPost);  // 201: Created
    }
    catch (error) {
        res.status(409).json({ message: error.message });   // 409: Conflict
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
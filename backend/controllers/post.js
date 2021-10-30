import Post from "../models/post.js";
import { validationResult } from "express-validator";

export const getPost = async(req, res) => {
    try {
        const posts = await Post.find().select('_id title body')

       res.json( posts )
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
    
}

export const createPost = async(req, res) => {
// validate error result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title, body} = req.body

    try {
        if(title.length && body.length < 4 ) {
            res.status(404).json({message: 'Input must be more than 4'})
        }
 

    const post = await new Post({title, body})
    
    const savePost = await post.save()

    res.status(200).send(savePost)
    } catch (error) {
        console.log(error.message);
    }
}
import express from 'express';
import controller from '../controllers/PostController';
import handleBodyField from '../middleware/handleBodyField';
import verifyUser from '../middleware/verifyUser';
const post = express.Router();

post.post("/", verifyUser(), handleBodyField("postTextContent"), (req, res) => {
    controller.addPost(req, res);
})

export default post
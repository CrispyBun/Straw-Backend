import express from 'express';
import controller from '../controllers/PostController';
import handleBodyField from '../middleware/handleBodyField';
import handlePaginationQuery from '../middleware/handlePaginationQuery';
import verifyUser from '../middleware/verifyUser';
const post = express.Router();

post.get("/", handlePaginationQuery(50, 1024, 0), (req, res) => {
    controller.getPosts(req, res);
});

post.post("/", verifyUser(), handleBodyField("postTextContent"), (req, res) => {
    controller.addPost(req, res);
})

export default post
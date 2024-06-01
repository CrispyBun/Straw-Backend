import express from 'express';
import postRepository from '../database/PostRepository';
import builder from '../response/ResponseBuilder';

class PostController {
    async addPost(req: express.Request, res: express.Response) {
        if (!req.parsedHeaders.verifiedUserId) throw new Error();
        if (!req.parsedParams.boardId) throw new Error();
        if (!req.parsedBody.postTextContent) throw new Error();

        const id = await postRepository.add({
            authorId: req.parsedHeaders.verifiedUserId,
            boardId: req.parsedParams.boardId,
            textContent: req.parsedBody.postTextContent
        });
        builder
        .success()
        .setData({id: id})
        .send(res);
    }
}

export default new PostController();
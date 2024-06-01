import express from 'express';
import postRepository from '../database/PostRepository';
import boardRepository from '../database/BoardRepository';
import builder from '../response/ResponseBuilder';

class PostController {
    async addPost(req: express.Request, res: express.Response) {
        if (!req.parsedHeaders.verifiedUserId) throw new Error();
        if (!req.parsedBody.postTextContent) throw new Error();

        if (!req.parsedParams.boardId) {
            if (!req.parsedParams.boardUrl) throw new Error();
            req.parsedParams.boardId = await boardRepository.getIdFromUrl(req.parsedParams.boardUrl);
        }

        const id = await postRepository.add({
            authorId: req.parsedHeaders.verifiedUserId,
            boardId: req.parsedParams.boardId!,
            textContent: req.parsedBody.postTextContent
        });
        builder
        .success()
        .setData({id: id})
        .send(res);
    }

    async getPosts(req: express.Request, res: express.Response) {
        if (!req.parsedParams.boardId) {
            if (!req.parsedParams.boardUrl) throw new Error();
            req.parsedParams.boardId = await boardRepository.getIdFromUrl(req.parsedParams.boardUrl);
        }

        const posts = await postRepository.getMany(req.parsedParams.boardId!, req.pagination.skip, req.pagination.limit);
        const postCount = await postRepository.getCount();
        builder
        .success()
        .setData(posts)
        .addMeta("count", postCount)
        .send(res);
    }
}

export default new PostController();
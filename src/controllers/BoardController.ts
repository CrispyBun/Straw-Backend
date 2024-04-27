import Controller from './Controller';
import boardRepository from '../database/BoardRepository';
import builder from '../response/ResponseBuilder';

class BoardController extends Controller {
    async getBoards() {
        const boards = await boardRepository.getMany(this.req.pagination.skip, this.req.pagination.limit, this.req.boardData.types);
        builder
        .success()
        .setData(boards)
        .send(this.res);
    }
}

export default BoardController;
import * as express from 'express';

class Controller {
    protected req: express.Request;
    protected res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }
}

export default Controller;
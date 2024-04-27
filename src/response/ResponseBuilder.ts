import * as express from 'express';

class Response {
    private status: number = 200;
    private message: string = "OK";
    private data: object = {};

    public send(res: express.Response) {
        res.status(this.status);
        res.json({
            message: this.message,
            data: this.data
        });
    }

    public setStatus(status: number) {
        this.status = status;
        return this;
    }

    public setMessage(message: string) {
        this.message = message;
        return this;
    }

    public setData(data: object) {
        this.data = data;
        return this;
    }
}

class ResponseBuilder {
    public success() {
        const response = new Response();
        return response.setStatus(200).setMessage("OK");
    }

    public notFound() {
        const response = new Response();
        return response.setStatus(404).setMessage("Not Found");
    }

    public error() {
        const response = new Response();
        return response.setStatus(500).setMessage("Internal Server Error");
    }

    public badRequest() {
        const response = new Response();
        return response.setStatus(400).setMessage("Bad Request");
    }
}

export default new ResponseBuilder;
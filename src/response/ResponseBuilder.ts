import express from 'express';
import { logger } from '../logger/loggers';

class Response {
    private status: number = 500; // 500 as default if status hasn't been set (should never happen)
    private message: string = "Internal Server Error";
    private data: object|null = null;
    private meta?: {[key: string]: any};

    public send(res: express.Response) {
        res.status(this.status);
        res.json({
            message: this.message,
            meta: this.meta,
            data: this.data
        });
        logger.debug(`[-> ${res.logId}] Responded with ${this.status} (${this.message}) (${(new Date as any) - (res.requestTimestamp as any)}ms)`);
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

    public addMeta(key: string, value: any) {
        if (this.meta === undefined) this.meta = {};
        this.meta[key] = value;
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

    public conflict() {
        const response = new Response();
        return response.setStatus(409).setMessage("Conflict");
    }

    public unauthorized() {
        const response = new Response();
        return response.setStatus(401).setMessage("Unauthorized");
    }
}

export default new ResponseBuilder;
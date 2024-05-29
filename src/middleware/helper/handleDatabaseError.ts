import builder from '../../response/ResponseBuilder';
import express from 'express';
import pg from 'pg';

const handleDatabaseError = (err: pg.DatabaseError, res: express.Response) => {
    if (err.code === "23505") {
        builder
        .conflict()
        .setMessage("Resource already exists")
        .send(res);
        return;
    }

    builder
    .error()
    .send(res);
    return;
}

export default handleDatabaseError
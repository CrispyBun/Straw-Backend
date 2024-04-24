import 'dotenv/config';
require("log-node")();
import log from 'log';
import express from 'express';
import helmet  from 'helmet';
import pg from 'pg';
import joi from 'joi';
// import nodemailer from 'nodemailer';

const { Client } = pg;
const logMain = log.get("main");

const process_env_DB_PORT = Number(process.env.DB_PORT);
const client = new Client({
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    host:     process.env.DB_HOST,
    port:     process_env_DB_PORT,
    database: process.env.DB_NAME,
});

const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

logMain.info("Launching");
logMain.info("Connecting to database");
client.connect(() => {
    logMain.info("Connected to database, launching server");
    app.listen(3000, () => {
        logMain.notice("Server is running on port 3000");
    });
});
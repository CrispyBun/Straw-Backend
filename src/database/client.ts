import pg from 'pg';
import { logger } from '../logger/loggers';

const { Client } = pg;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

if (DB_HOST === undefined) logger.error("Missing DB_HOST in .env");
if (isNaN(DB_PORT))        logger.error("Missing DB_PORT in .env");
if (DB_NAME === undefined) logger.error("Missing DB_NAME in .env");
if (DB_USER === undefined) logger.error("Missing DB_USER in .env");
if (DB_PASS === undefined) logger.error("Missing DB_PASS in .env");

const client = new Client({
    user:     DB_USER,
    password: DB_PASS,
    host:     DB_HOST,
    port:     DB_PORT,
    database: DB_NAME,
});

export default client;
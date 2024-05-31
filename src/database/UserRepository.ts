import client from "./client";

class UserRepository {
    async exists(id: number) {
        const user = await client.query('SELECT EXISTS(SELECT 1 FROM "user" WHERE "id" = $1)', [id]);
        return user.rows[0].exists;
    }

    async urlExists(url: string) {
        const urlExists = await client.query('SELECT EXISTS(SELECT 1 FROM "user" WHERE "url" = $1)', [url]);
        return urlExists.rows[0].exists;
    }

    async add(data: {username: string, password: string, url: string, email?: string}) {
        const url = data.url;
        const username = data.username;
        const email = data.email;
        const password = data.password;
        const result = await client.query('INSERT INTO "user" ("url", "username", "email", "password") VALUES ($1, $2, $3, $4) RETURNING "id"', [url, username, email, password]);
        return result.rows[0].id;
    }

    async get(id: number) {
        const user = await client.query('SELECT "id", "username" FROM "user" WHERE "id" = $1', [id]);
        return user.rows[0];
    }

    async getPersonal(id: number) {
        const user = await client.query('SELECT "id", "username", "email" FROM "user" WHERE "id" = $1', [id]);
        return user.rows[0]
    }

    async emailExists(email: string) {
        const emailExists = await client.query('SELECT EXISTS(SELECT 1 FROM "user" WHERE "email" = $1)', [email]);
        return emailExists.rows[0].exists;
    }

    async usernameExists(username: string) {
        const usernameExists = await client.query('SELECT EXISTS(SELECT 1 FROM "user" WHERE "username" = $1)', [username]);
        return usernameExists.rows[0].exists;
    }

    async getLoginDataFromEmail(email: string) {
        const password = await client.query('SELECT "id", "password" FROM "user" WHERE "email" = $1', [email]);
        return password.rows[0];
    }

    async getLoginDataFromUsername(username: string) {
        const password = await client.query('SELECT "id", "password" FROM "user" WHERE "username" = $1', [username]);
        return password.rows[0];
    }

    async getTokenValidity(id: number) {
        const validity = await client.query('SELECT "token_reset" FROM "user" WHERE "id" = $1', [id]);
        return validity.rows[0];
    }
}

export default new UserRepository();
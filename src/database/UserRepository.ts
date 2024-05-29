import client from "./client";

class UserRepository {
    async exists(id: number) {
        const user = await client.query('SELECT EXISTS(SELECT 1 FROM "user" WHERE "id" = $1)', [id]);
        return user.rows[0].exists;
    }

    async add(data: {username: string, password: string, email?: string}) {
        const username = data.username;
        const email = data.email;
        const password = data.password;
        const result = await client.query('INSERT INTO "user" ("username", "email", "password") VALUES ($1, $2, $3) RETURNING "id"', [username, email, password]);
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
import client from "./client";

class UserRepository {
    async add(data: {username: string, password: string, email?: string}) {
        const username = data.username;
        const email = data.email;
        const password = data.password;
        const result = await client.query('INSERT INTO "user" ("username", "email", "password") VALUES ($1, $2, $3) RETURNING "id"', [username, email, password]);
        return result.rows[0].id;
    }

    async emailExists(email: string) {
        const emailCount = await client.query('SELECT COUNT("email") FROM "user" WHERE "email" = $1', [email]);
        if (emailCount.rows[0].count > 0) return true;
        return false;
    }

    async usernameExists(username: string) {
        const usernameCount = await client.query('SELECT COUNT("username") FROM "user" WHERE "username" = $1', [username]);
        if (usernameCount.rows[0].count > 0) return true;
        return false;
    }

    async getLoginDataFromEmail(email: string) {
        const password = await client.query('SELECT "id", "password" FROM "user" WHERE "email" = $1', [email]);
        return password.rows[0];
    }

    async getLoginDataFromUsername(username: string) {
        const password = await client.query('SELECT "id", "password" FROM "user" WHERE "username" = $1', [username]);
        return password.rows[0];
    }
}

export default new UserRepository();
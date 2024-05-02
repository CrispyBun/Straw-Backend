import client from "./client";

class UserRepository {
    async add(data: {password: string, email?: string}) {
        const email = data.email;
        const password = data.password;
        const result = await client.query('INSERT INTO "user" ("email", "password") VALUES ($1, $2) RETURNING "id"', [email, password]);
        return result.rows[0].id;
    }

    async emailExists(email: string) {
        const emailCount = await client.query('SELECT COUNT("email") FROM "user" WHERE "email" = $1', [email]);
        if (emailCount.rows[0].count > 0) return true;
        return false;
    }
}

export default new UserRepository();
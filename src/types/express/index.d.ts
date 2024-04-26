export {}

interface UserData {
    id: number
}

interface Pagination {
    limit: number,
    skip: number
}

declare global {
    namespace Express {
        interface Request {
            userData: UserData,
            pagination: Pagination
        }
    }
}
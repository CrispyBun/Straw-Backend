export {}

interface UserData {
    id: number
}

declare global {
    namespace Express {
        interface Request {
            userData?: UserData
        }
    }
}
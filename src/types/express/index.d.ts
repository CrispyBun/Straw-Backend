export {}

interface UserData {
    id: number
}

interface Pagination {
    limit: number,
    skip: number
}

export type BoardType = 'official'|'usermade'|'profile'

interface BoardData {
    types?: BoardType[]
}

declare global {
    namespace Express {
        interface Request {
            userData: UserData,
            boardData: BoardData,
            pagination: Pagination,
        }
    }
}
export {}

interface Pagination {
    limit: number,
    skip: number
}

export type BoardType = 'official'|'usermade'|'profile'

interface ParsedBody {
    username?: string,
    email?: string,
    password?: string,

    boardName?: string,
    boardSummary?: string
}

interface ParsedQuery {
    boardType?: BoardType[]
}

interface ParsedParams {
    boardId?: number,
}

declare global {
    namespace Express {
        interface Request {
            pagination: Pagination,
            parsedBody: ParsedBody
            parsedQuery: ParsedQuery
            parsedParams: ParsedParams
        }

        interface Response {
            logId?: number;
            requestTimestamp?: Date;
        }
    }
}
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
    boardSummary?: string,

    postTextContent?: string
}

interface ParsedQuery {
    boardType?: BoardType[]
}

interface ParsedParams {
    boardId?: number,
    boardUrl?: string,
    userId?: number
}

interface ParsedHeaders {
    verifiedUserId?: number;
}

declare global {
    namespace Express {
        interface Request {
            pagination: Pagination;
            parsedBody: ParsedBody;
            parsedQuery: ParsedQuery;
            parsedParams: ParsedParams;
            parsedHeaders: ParsedHeaders;
        }

        interface Response {
            logId?: number;
            requestTimestamp?: Date;
        }
    }
}
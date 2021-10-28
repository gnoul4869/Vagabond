import { StatusCodes } from 'http-status-codes';

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export { BadRequestError, AuthenticationError, NotFoundError };
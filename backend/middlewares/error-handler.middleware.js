import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
    };

    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = `Duplicate key value for ${Object.keys(
            err.keyValue
        )}`;
    }

    if (err.name && err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(err.errors).map((item) => item.message);
    }

    if (err.name && err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = `No item found with id ${err.value}`;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
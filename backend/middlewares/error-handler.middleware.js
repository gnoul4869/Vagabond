import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
    };

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;

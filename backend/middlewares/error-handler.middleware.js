import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        // message: err.message || 'Đã có lỗi xảy ra, hãy thử lại sau',
    };

    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = `${Object.keys(err.keyValue)} đã tồn tại`;
    }

    if (err.name && err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = Object.values(err.errors).map((item) => item.message);
    }

    if (err.name && err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.message = 'Không tìm thấy kết quả nào';
    }

    return res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;

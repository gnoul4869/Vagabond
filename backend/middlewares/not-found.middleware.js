import { StatusCodes } from 'http-status-codes';

const notFound = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route does not exist' });
};

export default notFound;

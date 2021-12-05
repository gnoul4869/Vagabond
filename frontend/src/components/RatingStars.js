import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im';

const RatingStars = ({ rating, css }) => {
    return (
        <div className={`d-flex align-items-center ${css}`}>
            {rating >= 1 ? <ImStarFull /> : rating >= 0.5 ? <ImStarHalf /> : <ImStarEmpty />}
            {rating >= 2 ? <ImStarFull /> : rating >= 1.5 ? <ImStarHalf /> : <ImStarEmpty />}
            {rating >= 3 ? <ImStarFull /> : rating >= 2.5 ? <ImStarHalf /> : <ImStarEmpty />}
            {rating >= 4 ? <ImStarFull /> : rating >= 3.5 ? <ImStarHalf /> : <ImStarEmpty />}
            {rating >= 5 ? <ImStarFull /> : rating >= 4.5 ? <ImStarHalf /> : <ImStarEmpty />}
        </div>
    );
};

export default RatingStars;

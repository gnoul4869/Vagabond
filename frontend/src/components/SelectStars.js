import { useState } from 'react';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';

const SelectStars = ({ stars, setStars, css }) => {
    const [hoveredStars, setHoveredStars] = useState(0);

    return (
        <div className={`d-flex align-items-center ${css}`}>
            {[...Array(5)].map((item, index) => {
                const starNum = index + 1;
                return (
                    <span
                        key={index}
                        onMouseEnter={() => setHoveredStars(starNum)}
                        onMouseLeave={() => setHoveredStars(0)}
                        onClick={() => setStars(starNum)}
                        className="pe-1"
                    >
                        {stars >= starNum || hoveredStars >= starNum ? (
                            <ImStarFull />
                        ) : (
                            <ImStarEmpty />
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default SelectStars;

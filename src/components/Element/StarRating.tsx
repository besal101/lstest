import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import cn from "classnames";

interface StarRatingProps {
  rating: number;
  size: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size, className }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    // Handle the click event if needed
    // For example, you can submit the rating to the server
  };

  const renderStar = (
    index: number,
    size: number,
    className: string | undefined
  ): JSX.Element => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    if (index < filledStars) {
      return (
        <FaStar
          key={index}
          className={cn(`text-black fill-current, ${className}`)}
          size={size}
        />
      );
    }

    if (index === filledStars && hasHalfStar) {
      return (
        <FaStarHalfAlt
          key={index}
          className={cn(`text-black fill-current, ${className}`)}
          size={size}
        />
      );
    }

    return (
      <FaRegStar
        key={index}
        className={cn(`text-black fill-current, ${className}`)}
        size={size}
      />
    );
  };

  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          {renderStar(index, size, className)}
        </div>
      ))}
    </div>
  );
};

export default StarRating;

// StarRating.tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // Rating out of 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={index}
          className="text-yellow-500 transition-transform transform hover:scale-125"
          fill="url(#star-gradient)" // Gradient fill for full stars
          size={18} // Larger star size
        />
      ))}
      {hasHalfStar && (
        <Star
          className="text-yellow-300 transition-transform transform hover:scale-125"
          fill="url(#star-gradient)"
          size={18}
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <Star
          key={index + fullStars}
          className="text-gray-300 transition-transform transform hover:scale-110"
          size={18}
        />
      ))}

      {/* Gradient for filled stars */}
      <svg width="0" height="0">
        <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffdd1a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffd900', stopOpacity: 1 }} />
        </linearGradient>
      </svg>
    </div>
  );
};

export default StarRating;

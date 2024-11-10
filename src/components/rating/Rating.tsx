// StarRating.tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
      <div className="flex items-center bg-green-500 text-white font-semibold rounded-md px-2 py-1 space-x-1">
        <span className="text-sm">{rating.toFixed(1)}</span>
        <Star className="text-white" size={14} fill="currentColor" />
      </div>
  );
};

export default StarRating;

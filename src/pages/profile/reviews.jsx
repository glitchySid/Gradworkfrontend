import {ReviewSchema} from "./zod-reviews.js";
// eslint-disable-next-line react/prop-types
const ReviewCard = ({review}) => {
    // Use the Zod-validated review data
    const {name, rating, text, image} = ReviewSchema.parse(review);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 m-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <div className="bg-gray-400 mb-4 w-10 h-10 rounded-full mr-3">
                        {image ? (
                            <img src={image} alt={name} className="w-10 h-10 rounded-full mr-3"/>
                        ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        )}
                    </div>
                    <h3 className="text-lg font-medium">{name}</h3>
                </div>
            </div>
            <div className="ml-10 p-2">
                <div className="flex items-center mb-2">
                    {[...Array(rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                        <svg key={i + rating} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                    ))}
                </div>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
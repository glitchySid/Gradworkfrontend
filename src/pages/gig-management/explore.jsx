import PropTypes from 'prop-types';
import {Star} from 'lucide-react';
import gigs from '../../data/gigsData.json';
import {useEffect, useState} from "react";
import Header from "../../components/ui/header.jsx";

const gigsData = gigs.gigs;

const GigCard = ({ gig }) => {
    const [imagePath, setImagePath] = useState(null);

    useEffect(() => {
        import(`../../assets/gigs/${gig.image}`)
            .then(module => setImagePath(module.default))
            .catch(error => console.error("Error loading image:", error)); // Important: Handle errors!
    }, [gig.image]);
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[4/3] bg-gray-200">
                {imagePath ? (
                    <img
                        src={imagePath}
                        alt={gig.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src="../../assets/profile_icon.svg"
                            alt={gig.author}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium">{gig.author}</span>
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{gig.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{gig.description}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{gig.rating}</span>
                    <span className="text-gray-400">({gig.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-gray-500">From</span>
                    <span className="font-medium">${gig.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

GigCard.propTypes = {
    gig: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        reviews: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

const GigExplorer = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Header/>
            <div className={"p-4"}>
            <h2 className="text-xl font-semibold mb-6">Explore Gigs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {gigsData.map((gig) => (
                    <GigCard key={gig.id} gig={gig} />
                ))}
            </div>

            <h2 className="text-xl font-semibold my-8">You may like</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {gigsData.slice(0, 4).map((gig) => (
                    <GigCard key={`suggested-${gig.id}`} gig={gig} />
                ))}
            </div>
        </div>
        </div>
    );
};

export default GigExplorer;
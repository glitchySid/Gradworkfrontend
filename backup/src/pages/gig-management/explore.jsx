import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Star} from 'lucide-react';
import gigs from '../../data/gigsData.json';
import Header from "../../components/ui/header.jsx";

const gigsData = gigs.gigs;

const GigCard = ({ gig }) => {
    const imagePath = `/public/gigs/${gig.image}`;

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[320px] md:max-w-[350px]">
            <div className="relative aspect-[5/3] bg-gray-200">
                <img
                    src={imagePath}
                    alt={gig.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                {/* Flex container with space-between */}
                <div className="flex items-center justify-between mb-2">
                    {/* Author section */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <img
                                src="/public/vite.svg"
                                alt={gig.author}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-medium">{gig.author}</span>
                    </div>

                    {/* Beginner Pill aligned to the right */}
                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                Beginner
            </span>
                </div>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{gig.description}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{gig.rating}</span>
                    <span className="text-gray-400">({gig.reviews})</span>
                </div>
                <div className="flex items-center justify-normal pt-2">
                    <span className="text-xs text-gray-500 mr-3">From</span>
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
    const [visibleGigs, setVisibleGigs] = useState(gigsData);

    useEffect(() => {
        const updateVisibleGigs = () => {
            if (window.innerWidth < 640) {
                setVisibleGigs(gigsData.slice(0, 4));
            } else {
                setVisibleGigs(gigsData);
            }
        };

        updateVisibleGigs();
        window.addEventListener('resize', updateVisibleGigs);

        return () => {
            window.removeEventListener('resize', updateVisibleGigs);
        };
    }, []);

    const handleAboutUsClick = () => {
        console.log("About Us clicked");
    };

    return (
        <div>
            <Header onAboutUsClick={handleAboutUsClick}/>
            <div className="max-w-7xl mx-auto">
                <div className={"p-4 mt-8"}>
                    <h2 className="text-xl font-semibold mb-6">Explore Gigs</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
                        {visibleGigs.map((gig) => (
                            <GigCard key={gig.id} gig={gig}/>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold my-8 mt-8">You may like</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gigsData.slice(0, 4).map((gig) => (
                            <GigCard key={`suggested-${gig.id}`} gig={gig}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigExplorer;
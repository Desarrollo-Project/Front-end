import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Tag, DollarSign } from 'lucide-react';
import { Auction } from '../../types';
import Button from '../ui/Button';

interface AuctionCardProps {
  auction: Auction;
  compact?: boolean;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction, compact = false }) => {
  const navigate = useNavigate();
  
  // Calculate time remaining
  const endDate = new Date(auction.endDate);
  const now = new Date();
  const timeLeft = endDate.getTime() - now.getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  const isEnded = timeLeft <= 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const handleClick = () => {
    navigate(`/auctions/${auction.id}`);
  };
  
  if (compact) {
    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative">
          <img 
            src={auction.imageUrl} 
            alt={auction.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white font-semibold truncate">{auction.title}</h3>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-600 font-medium">
              {formatCurrency(auction.currentBid)}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {isEnded ? (
                <span className="text-red-500">Ended</span>
              ) : (
                <span>{daysLeft}d {hoursLeft}h left</span>
              )}
            </div>
          </div>
          <Button size="sm" variant="outline" fullWidth>
            View Auction
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={auction.imageUrl} 
            alt={auction.title} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {auction.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {category}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{auction.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{auction.description}</p>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Current Bid</div>
                  <div className="flex items-center text-xl font-bold text-purple-600">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {auction.currentBid.toLocaleString()}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Time Left</div>
                  <div className="flex items-center text-gray-800">
                    <Clock className="h-5 w-5 mr-1" />
                    {isEnded ? (
                      <span className="text-red-500 font-semibold">Auction Ended</span>
                    ) : (
                      <span className="font-semibold">{daysLeft}d {hoursLeft}h</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={handleClick}
                >
                  View Details
                </Button>
                {!isEnded && (
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={handleClick}
                  >
                    Place Bid
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
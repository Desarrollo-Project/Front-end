import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Auction } from '../../types';
import Button from '../ui/Button';
import { placeBid } from '../../services/api';

interface BidFormProps {
  auction: Auction;
  onBidPlaced: (updatedAuction: Auction) => void;
}

const BidForm: React.FC<BidFormProps> = ({ auction, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState<number>(auction.currentBid + 10);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const minBid = auction.currentBid + 1;
  
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBidAmount(value);
    
    if (value <= auction.currentBid) {
      setError(`Bid must be higher than ${auction.currentBid}`);
    } else {
      setError('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bidAmount <= auction.currentBid) {
      setError(`Bid must be higher than current bid of ${auction.currentBid}`);
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await placeBid(auction.id, bidAmount);
      
      if (response.success) {
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        
        onBidPlaced(response.data);
      } else {
        setError(response.error || 'Failed to place bid');
      }
    } catch (err) {
      console.error('Error placing bid:', err);
      setError('An error occurred while placing your bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if auction has ended
  const now = new Date();
  const endDate = new Date(auction.endDate);
  const isEnded = now > endDate;
  
  if (isEnded) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-gray-700">This auction has ended</p>
        {auction.bids.length > 0 ? (
          <p className="font-medium text-purple-700 mt-2">
            Final bid: ${auction.currentBid.toLocaleString()}
          </p>
        ) : (
          <p className="text-gray-700 mt-2">No bids were placed</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Place Your Bid</h3>
      
      {showSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 mb-4 flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Your bid was successfully placed!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Current Bid: ${auction.currentBid.toLocaleString()}
            </label>
            
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                min={minBid}
                step="1"
                value={bidAmount}
                onChange={handleBidChange}
                className={`block w-full pl-10 pr-12 py-2 sm:text-sm border ${
                  error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                } rounded-md focus:outline-none focus:ring-2 focus:border-transparent`}
                placeholder="Enter bid amount"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
            
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            disabled={bidAmount <= auction.currentBid || isSubmitting}
          >
            Place Bid
          </Button>
          
          <p className="text-xs text-gray-500 mt-2">
            By placing a bid, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
};

export default BidForm;
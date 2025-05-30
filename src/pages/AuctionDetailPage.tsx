import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Tag, User, Eye, Share2, Heart, ArrowLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import BidForm from '../components/auctions/BidForm';
import Button from '../components/ui/Button';
import { auctionService } from '../services/api';
import { Auction as AuctionType } from '../types';
import { useAuth } from '../context/AuthContext';

const AuctionDetailPage: React.FC = () => {
  const [auction, setAuction] = useState<AuctionType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const { auth } = useAuth();
  
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        if (!id) return;
        const response = await auctionService.getAuctionById(id);
        if (response) {
          setAuction(response);
        } else {
          setError('Subasta no encontrada');
        }
      } catch (err) {
        console.error('Error al obtener detalles de la subasta:', err);
        setError('No se pudieron cargar los detalles de la subasta');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuction();
  }, [id]);
  
  const handleBidPlaced = async (amount: number) => {
    try {
      if (!id) return;
      const response = await auctionService.placeBid(id, amount);
      if (response) {
        setAuction(response);
      }
    } catch (error) {
      console.error('Error al realizar la puja:', error);
      setError('No se pudo realizar la puja');
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (error || !auction) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Auction not found'}
            </h2>
            <p className="text-gray-600 mb-6">
              The auction you're looking for doesn't exist or may have been removed.
            </p>
            <Link to="/auctions">
              <Button variant="primary">
                Browse Auctions
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Calculate time remaining
  const endDate = new Date(auction.endDate);
  const now = new Date();
  const timeLeft = endDate.getTime() - now.getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  const isEnded = timeLeft <= 0;
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link to="/auctions" className="text-gray-500 hover:text-gray-700">Auctions</Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-700 font-medium truncate max-w-xs">
                {auction.title}
              </li>
            </ol>
          </nav>
          
          <div className="mb-6">
            <Link to="/auctions" className="inline-flex items-center text-purple-600 hover:text-purple-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Auctions
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2">
                <div className="relative h-96 md:h-full">
                  <img 
                    src={auction.imageUrl} 
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="md:w-1/2 p-6">
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
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{auction.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span>Seller: {auction.seller.name}</span>
                  <div className="mx-2 h-1 w-1 rounded-full bg-gray-400"></div>
                  <Eye className="h-4 w-4 mr-1" />
                  <span>128 views</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Current Bid</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {formatCurrency(auction.currentBid)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Started at {formatCurrency(auction.startingPrice)}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">
                    {isEnded ? 'Auction Ended' : 'Auction Ends'}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-600" />
                    {isEnded ? (
                      <span className="text-red-600 font-medium">Ended on {formatDate(auction.endDate)}</span>
                    ) : (
                      <div>
                        <span className="font-medium">{formatDate(auction.endDate)}</span>
                        <div className="flex gap-2 mt-1">
                          <div className="bg-gray-100 py-1 px-2 rounded text-xs font-medium">
                            {daysLeft}d
                          </div>
                          <div className="bg-gray-100 py-1 px-2 rounded text-xs font-medium">
                            {hoursLeft}h
                          </div>
                          <div className="bg-gray-100 py-1 px-2 rounded text-xs font-medium">
                            {minutesLeft}m
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {auth.isAuthenticated ? (
                  <BidForm auction={auction} onBidPlaced={(updatedAuction) => {
                    handleBidPlaced(updatedAuction.currentBid);
                  }} />
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <p className="text-gray-700 mb-3">You need to be logged in to place a bid</p>
                    <div className="flex space-x-3">
                      <Link to="/login" className="w-full">
                        <Button variant="primary" fullWidth>
                          Log In
                        </Button>
                      </Link>
                      <Link to="/register" className="w-full">
                        <Button variant="outline" fullWidth>
                          Register
                        </Button>
                      </Link>
                    </div>
                  </div>
                )} 
              </div>
            </div>
            
        
            <div className="px-6 py-6 border-t border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                  <button className="whitespace-nowrap py-2 px-1 border-b-2 border-purple-600 font-medium text-sm text-purple-600">
                    Description
                  </button>
                  <button className="whitespace-nowrap py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Bid History ({auction.bids.length})
                  </button>
                  <button className="whitespace-nowrap py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Shipping Info
                  </button>
                  <button className="whitespace-nowrap py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Seller Information
                  </button>
                </nav>
              </div>
              
              <div className="py-6 prose prose-sm max-w-none">
                <p className="text-gray-800">{auction.description}</p>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Item Details</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">Item Condition:</span>
                      <span className="ml-2 text-gray-900">Excellent</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 text-gray-900">New York, NY</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="ml-2 text-gray-900">Credit Card, PayPal</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Shipping:</span>
                      <span className="ml-2 text-gray-900">Domestic & International</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Auctions */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Auctions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => {
                const relatedAuction = {
                  ...auction,
                  id: `related-${index}`,
                  title: ['Vintage Watch Collection', 'Antique Wooden Chair', 'Art Deco Lamp', 'Rare Vinyl Records'][index],
                  currentBid: auction.currentBid - 100 + (index * 50),
                };
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={auction.imageUrl} 
                        alt={relatedAuction.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 truncate">
                        {relatedAuction.title}
                      </h3>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-purple-600 font-medium">
                          {formatCurrency(relatedAuction.currentBid)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>3d 5h left</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" fullWidth>
                        View Auction
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Wrap the component with AuthProtected to only allow authenticated users
const ProtectedAuctionDetailPage: React.FC = () => {
  // Since we want to show the auction details for non-authenticated users but restrict bidding,
  // we don't wrap the entire page in AuthProtected
  return <AuctionDetailPage />;
};

export default ProtectedAuctionDetailPage;
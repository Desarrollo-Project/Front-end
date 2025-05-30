export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  imageUrl: string;
  endDate: string;
  seller: {
    id: string;
    name: string;
  };
  bids: Bid[];
  categories: string[];
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  date: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
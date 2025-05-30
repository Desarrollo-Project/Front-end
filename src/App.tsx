import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityHistoryPage from './pages/profile/ActivityHistoryPage';
import EditProfilePage from './pages/profile/EditProfilePage';
import AuctionHistoryPage from './pages/profile/AuctionHistoryPage';
import BiddingHistoryPage from './pages/profile/BiddingHistoryPage';
import AuctionsPage from './pages/auctions/AuctionsPage';
import MyAuctionsPage from './pages/auctions/MyAuctionsPage';
import CreateAuctionPage from './pages/auctions/CreateAuctionPage';
import EditAuctionPage from './pages/auctions/EditAuctionPage';
import AuctionDetailPage from './pages/auctions/AuctionDetailPage';
import BiddingPage from './pages/auctions/BiddingPage';
import PaymentsPage from './pages/payments/PaymentsPage';
import AddPaymentMethodPage from './pages/payments/AddPaymentMethodPage';
import PaymentHistoryPage from './pages/payments/PaymentHistoryPage';
import ProductsPage from './pages/products/ProductsPage';
import AddProductPage from './pages/products/AddProductPage';
import ReportsPage from './pages/ReportsPage';
import ClaimsPage from './pages/claims/ClaimsPage';
import SupportClaimsPage from './pages/claims/SupportClaimsPage';
import AuthProtected from './components/auth/AuthProtected';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirm-account" element={<ConfirmAccountPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/" element={<HomePage/>} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <AuthProtected>
              <DashboardPage />
            </AuthProtected>
          } />
          
          {/* Profile Routes */}
          <Route path="/profile" element={
            <AuthProtected>
              <ProfilePage />
            </AuthProtected>
          } />
          <Route path="/profile/activity" element={
            <AuthProtected>
              <ActivityHistoryPage />
            </AuthProtected>
          } />
          <Route path="/profile/edit" element={
            <AuthProtected>
              <EditProfilePage />
            </AuthProtected>
          } />
          <Route path="/profile/auctions" element={
            <AuthProtected>
              <AuctionHistoryPage />
            </AuthProtected>
          } />
          <Route path="/profile/bids" element={
            <AuthProtected>
              <BiddingHistoryPage />
            </AuthProtected>
          } />
          
          {/* Auction Routes */}
          <Route path="/auctions" element={
            <AuthProtected>
              <AuctionsPage />
            </AuthProtected>
          } />
          <Route path="/auctions/my-auctions" element={
            <AuthProtected>
              <MyAuctionsPage />
            </AuthProtected>
          } />
          <Route path="/auctions/create" element={
            <AuthProtected>
              <CreateAuctionPage />
            </AuthProtected>
          } />
          <Route path="/auctions/edit/:id" element={
            <AuthProtected>
              <EditAuctionPage />
            </AuthProtected>
          } />
          <Route path="/auctions/:id" element={
            <AuthProtected>
              <AuctionDetailPage />
            </AuthProtected>
          } />
          <Route path="/auctions/:id/bid" element={
            <AuthProtected>
              <BiddingPage />
            </AuthProtected>
          } />
          
          {/* Payment Routes */}
          <Route path="/payments" element={
            <AuthProtected>
              <PaymentsPage />
            </AuthProtected>
          } />
          <Route path="/payments/add" element={
            <AuthProtected>
              <AddPaymentMethodPage />
            </AuthProtected>
          } />
          <Route path="/payments/history" element={
            <AuthProtected>
              <PaymentHistoryPage />
            </AuthProtected>
          } />
          
          {/* Product Routes */}
          <Route path="/products" element={
            <AuthProtected>
              <ProductsPage />
            </AuthProtected>
          } />
          <Route path="/products/add" element={
            <AuthProtected>
              <AddProductPage />
            </AuthProtected>
          } />
          
          {/* Reports Route */}
          <Route path="/reports" element={
            <AuthProtected>
              <ReportsPage />
            </AuthProtected>
          } />
          
          {/* Claims Routes */}
          <Route path="/claims" element={
            <AuthProtected>
              <ClaimsPage />
            </AuthProtected>
          } />
          <Route path="/support/claims" element={
            <AuthProtected>
              <SupportClaimsPage />
            </AuthProtected>
          } />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
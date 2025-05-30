import React from 'react';
import Layout from '../components/layout/Layout';

const ProfilePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                <div className="mt-2 text-gray-600">
                  <p className="mb-2">Name: John Doe</p>
                  <p className="mb-2">Email: john.doe@example.com</p>
                  <p>Member since: January 1, 2024</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Account Statistics</h2>
                <div className="mt-2 text-gray-600">
                  <p className="mb-2">Auctions Won: 5</p>
                  <p className="mb-2">Active Bids: 3</p>
                  <p>Total Transactions: 8</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
                <div className="mt-2 text-gray-600">
                  <p className="mb-2">• Placed bid on Vintage Watch</p>
                  <p className="mb-2">• Won auction for Antique Vase</p>
                  <p>• Listed Classic Car for auction</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Account Status</h2>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
              View Activity History
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
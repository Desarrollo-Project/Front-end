import React from 'react';
import Layout from '../components/layout/Layout';

const DashboardPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Auctions</h2>
            <p className="text-4xl font-bold text-blue-600">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Bids</h2>
            <p className="text-4xl font-bold text-green-600">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Won Auctions</h2>
            <p className="text-4xl font-bold text-purple-600">0</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 text-center text-gray-500">
              No recent activity to display
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
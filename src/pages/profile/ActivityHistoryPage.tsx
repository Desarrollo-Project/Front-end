
import Layout from '../../components/layout/Layout';

const ActivityHistoryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Activity History</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {/* Activity history will be populated here */}
            <p className="text-gray-600">Your recent activities will appear here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityHistoryPage;
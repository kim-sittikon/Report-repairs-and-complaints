export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium">Active Jobs</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">56</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium">Completed (Month)</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">89</p>
            </div>
        </div>
    );
}

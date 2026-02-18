

export default function DashboardHome() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold text-gray-600">Total Students</h3>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold text-gray-600">Total Classes</h3>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-bold text-gray-600">Pending Fees</h3>
                    <p className="text-3xl font-bold text-red-600">$0.00</p>
                </div>
            </div>
        </div>
    );
}

import React from "react";

const DashboardHome = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">Welcome to Smart Campus Portal</h1>
      <p className="text-gray-600">
        This is your main dashboard overview. From here, you can manage all aspects of the campus portal such as users,
        landing page content, fees, attendance, and notices.
      </p>
    </div>
  );
};

export default DashboardHome;

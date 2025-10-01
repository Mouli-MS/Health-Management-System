'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import {
  Search, UserCircle, DollarSign, Calendar, UserCheck, Users
} from 'lucide-react';

const initialStats = {
  totalRevenue: 0,
  revenueChange: 0,
  totalPatients: 0,
  patientsChange: 0,
  appointmentsToday: 0,
  appointmentsDelta: 0,
  doctorsOnStaff: 0,
  doctorsDelta: 0,
};

const initialActivityData: { month: string; patients: number; appointments: number }[] = [];

const pieData = [
  { name: 'Revenue', value: 400 },
  { name: 'Expenses', value: 300 },
  { name: 'Profit', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(initialStats);
  const [activityData, setActivityData] = useState(initialActivityData);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/dashboard-stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    }

    async function fetchActivity() {
      try {
        const res = await fetch('/api/admin/hospital-activity');
        if (res.ok) {
          const data = await res.json();
          setActivityData(data);
        }
      } catch (error) {
        console.error('Failed to fetch hospital activity data', error);
      }
    }

    fetchStats();
    fetchActivity();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <UserCircle className="w-8 h-8 text-gray-600 dark:text-gray-300 cursor-pointer" />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
          {/* Statistic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+{stats.revenueChange}% from last month</p>
              </div>
              <DollarSign className="text-4xl text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Patients</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">+{stats.totalPatients}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+{stats.patientsChange}% from last month</p>
              </div>
              <Users className="text-4xl text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Appointments Today</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">+{stats.appointmentsToday}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+{stats.appointmentsDelta} since last hour</p>
              </div>
              <Calendar className="text-4xl text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Doctors on Staff</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.doctorsOnStaff}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+{stats.doctorsDelta} since last quarter</p>
              </div>
              <UserCheck className="text-4xl text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hospital Activity (Bar Chart)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Patient and appointment trends for the last 6 months.</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#4f46e5" name="Patients" />
                  <Bar dataKey="appointments" fill="#10b981" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Revenue Trend (Line Chart)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Monthly revenue over the last 6 months.</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="patients" stroke="#4f46e5" strokeWidth={2} name="Patients" />
                  <Line type="monotone" dataKey="appointments" stroke="#10b981" strokeWidth={2} name="Appointments" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Financial Overview (Pie Chart)</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Breakdown of revenue, expenses, and profit.</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </Layout>
  );
}

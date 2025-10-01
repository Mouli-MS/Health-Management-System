'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReceptionDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
      if (payload.role !== 'Reception') {
        router.push('/login');
      } else {
        setLoading(false);
      }
    } catch (error) {
      router.push('/login');
    }
  }, [router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">Loading...</div>
      </Layout>
    );
  }

  // Placeholder data for charts and stats
  const stats = [
    { name: 'Register Patient', description: 'Add new patient', action: 'Register', actionHref: '/reception/register-patient' },
    { name: 'Search Patients', description: 'Find existing patients', action: 'Search', actionHref: '/reception/search-patients' },
    { name: 'Billing', description: 'Manage bills', action: 'Manage', actionHref: '/reception/billing' },
  ];

  const chartData = [
    { name: 'Register Patient', value: 10 },
    { name: 'Search Patients', value: 20 },
    { name: 'Billing', value: 5 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reception Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* Placeholder icon */}
                    <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{stat.description}</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => router.push(stat.actionHref)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {stat.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reception Activities</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}

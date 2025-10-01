'use client';

import Layout from '../components/Layout';

export default function SettingsPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings here.</p>
        {/* Add settings form or content here */}
      </div>
    </Layout>
  );
}

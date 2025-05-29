import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Camera, Edit2, Shield, Bell, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CONTENT } from '../constants/content';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: CONTENT.profilePage.tabs.general, icon: Settings },
    { id: 'security', label: CONTENT.profilePage.tabs.security, icon: Shield },
    { id: 'notifications', label: CONTENT.profilePage.tabs.notifications, icon: Bell },
    { id: 'api', label: CONTENT.profilePage.tabs.api, icon: Key },
  ];

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-primary-900 rounded-xl shadow-sm overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary-600 to-accent-600">
          <button className="absolute bottom-4 left-4 p-2 bg-black/20 rounded-full text-white hover:bg-black/30 transition-colors">
            <Camera size={20} />
          </button>
        </div>
        
        <div className="px-6 py-4 flex items-end -mt-16 relative">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-primary-900 bg-gray-100 dark:bg-primary-800 flex items-center justify-center overflow-hidden">
              <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <button className="absolute bottom-0 left-0 p-2 bg-white dark:bg-primary-800 rounded-full shadow-md text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <Edit2 size={16} />
            </button>
          </div>
          
          <div className="mr-6 pb-4 text-right">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'مستخدم'}</h1>
            <p className="text-gray-600 dark:text-gray-300">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-primary-800">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={18} className="ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          <div className="p-6">
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {CONTENT.profilePage.general.displayName}
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-gray-900 dark:text-white text-right"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {CONTENT.profilePage.general.emailAddress}
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-gray-900 dark:text-white text-right"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {CONTENT.profilePage.general.bio}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-gray-900 dark:text-white text-right"
                    placeholder={CONTENT.profilePage.general.bioPlaceholder}
                  />
                </div>
                
                <div className="flex justify-start">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    {CONTENT.profilePage.general.saveChanges}
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'api' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 dark:bg-primary-800/50 rounded-lg p-4 text-right">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {CONTENT.profilePage.api.title}
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="r8_************************************"
                      readOnly
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-primary-700 bg-white dark:bg-primary-800 text-gray-900 dark:text-white text-right"
                    />
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      {CONTENT.profilePage.api.regenerate}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {CONTENT.profilePage.api.description}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
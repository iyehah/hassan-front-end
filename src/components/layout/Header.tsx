import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { CONTENT } from '../../constants/content';
import Logo from '../ui/Logo';

const Header = ({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void; isSidebarOpen: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/chat':
        return CONTENT.header.pages.chat;
      case '/about':
        return CONTENT.header.pages.about;
      default:
        return CONTENT.header.pages.default;
    }
  };

  return (
    <header 
      dir="rtl"
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-primary-950/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      } ${isSidebarOpen ? 'lg:mr-72' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="ml-4 text-primary-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              aria-label="فتح الشريط الجانبي"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="flex items-center">
              <Logo size={100} color="currentColor" />
              <span className="font-bold text-lg text-primary-900 dark:text-white">{CONTENT.header.brand}</span>
            </Link>
          </div>
          
          <h1 className="text-xl font-semibold text-primary-900 dark:text-white hidden md:block">
            {getPageTitle()}
          </h1>
          
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-full bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </button>
            
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-48 bg-white dark:bg-primary-900 rounded-lg shadow-lg py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-primary-800 text-right">
                    <p className="text-sm font-medium text-primary-900 dark:text-white">{user?.name || 'مستخدم'}</p>
                    <p className="text-xs text-primary-500 dark:text-primary-400 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary-800">
                      <Settings size={16} className="ml-2" />
                      {CONTENT.header.userMenu.settings}
                    </button>
                    <button 
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-primary-800"
                    >
                      <LogOut size={16} className="ml-2" />
                      {CONTENT.header.userMenu.logout}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
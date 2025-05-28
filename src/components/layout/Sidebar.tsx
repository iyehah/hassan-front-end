import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Info, X, Plus, Trash2 } from 'lucide-react';
import { CONTENT } from '../../constants/content';
import Logo from "../ui/Logo"

type ChatHistory = {
  id: string;
  title: string;
  date: string;
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(Array.from(CONTENT.sidebar.chatHistory));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isOpen) {
        // Don't automatically close on desktop
      } else if (window.innerWidth < 1024 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  const deleteChat = (id: string) => {
    setChatHistory(chatHistory.filter(chat => chat.id !== id));
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        dir="rtl"
        className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-primary-950 shadow-xl z-50 flex flex-col"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-primary-800">
          <div className="flex items-center">
              <Logo size={100} color='currentColor'/>
            {/* <h2 className="font-bold text-lg text-primary-900 dark:text-white">{CONTENT.sidebar.brand}</h2> */}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-primary-800 text-gray-500 dark:text-gray-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2 px-4 transition-colors">
            <Plus size={18} />
            <span>{CONTENT.sidebar.buttons.newChat}</span>
          </button>
        </div>
        
        <nav className="px-2 py-4">
            {CONTENT.sidebar.navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path || '/'} // Provide a fallback path if item.path is undefined
              className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-900/50'
              }`
              }
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              {index === 0 ? <MessageSquare size={20} /> : <Info size={20} />}
              <span>{item.label}</span>
            </NavLink>
            ))}
        </nav>
        
        <div className="px-4 mt-2">
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{CONTENT.sidebar.recentChats}</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2">
          {chatHistory.map(chat => (
            <div
              key={chat.id}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg mb-1 hover:bg-gray-100 dark:hover:bg-primary-900/50 group text-right"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">{chat.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</p>
              </div>
              <button
                onClick={() => deleteChat(chat.id)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-primary-800 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-primary-800 text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p className="mb-1">{CONTENT.sidebar.footer.assistant}</p>
            <p>{CONTENT.sidebar.footer.copyright}</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
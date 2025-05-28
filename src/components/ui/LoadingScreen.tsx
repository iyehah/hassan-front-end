import { motion } from 'framer-motion';
import { CONTENT } from '../../constants/content';
import Icon from './Icon';

const LoadingScreen = () => {
  return (
    <div dir="rtl" className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-primary-950 to-primary-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative p-4 bg-white bg-opacity-10 rounded-2xl">
          <Icon size={64} color="#ffffff" />
          <motion.div
            className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-3xl font-bold text-white mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {CONTENT.loadingScreen.title}
      </motion.h1>
      
      <motion.p 
        className="text-white/80 text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {CONTENT.loadingScreen.subtitle}
      </motion.p>
      
      <div className="flex mt-8 space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-3 w-3 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
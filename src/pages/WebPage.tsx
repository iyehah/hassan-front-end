import { motion } from 'framer-motion';
import { Zap, Shield, Globe, ArrowRight, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTENT } from '../constants/content';

// Mapping of icon names to lucide-react components
const iconMap = {
  Bot: Bot,
  Sparkles: Sparkles,
  Shield: Shield,
  Globe: Globe,
};

const WebPage = () => {
  const { hero, features } = CONTENT.webPage;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-primary-950 dark:to-primary-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {hero.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                {' '}
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              {hero.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                {hero.getStarted}
                <ArrowRight size={20} className="mr-2" />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-primary-800 text-primary-600 dark:text-primary-400 font-medium hover:bg-gray-50 dark:hover:bg-primary-700 transition-colors"
              >
                {hero.learnMore}
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 dark:opacity-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 blur-3xl" />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {features.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {features.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.items.map((feature, index) => {
            // Dynamically select the icon component based on the icon name
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-primary-900 rounded-xl p-6 shadow-sm text-right"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-800 rounded-lg flex items-center justify-center mb-4 mr-auto">
                  {IconComponent ? <IconComponent size={24} className="text-primary-600 dark:text-primary-400" /> : <Bot size={24} className="text-primary-600 dark:text-primary-400" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              {hero.ctaTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg opacity-90 mb-8"
            >
              {hero.ctaSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary-600 font-medium hover:bg-primary-50 transition-colors"
              >
                {hero.startFreeTrial}
                <Zap size={20} className="mr-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebPage;
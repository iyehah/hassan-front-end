/**
 * Footer component for the application.
 * Displays copyright information and links to social media. and my portfolio.
 * @version 1.0.0
 * @license MIT
 * @author Iyehah
 * @portfolio https://iyehah.com
*/
import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../constants/content';
import { GitHub, Twitter, LinkedIn } from 'lucide-react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-primary-900 border-t border-gray-200 dark:border-primary-800 py-4">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          {CONTENT.footer.copyright} &copy; {new Date().getFullYear()} Iyehah. All rights reserved.
        </motion.p>
        <div className="mt-2 flex justify-center space-x-4">
          <a
            href={CONTENT.footer.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <GitHub size={20} />
          </a>
          <a
            href={CONTENT.footer.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <Twitter size={20} />
          </a>
          <a
            href={CONTENT.footer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <LinkedIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
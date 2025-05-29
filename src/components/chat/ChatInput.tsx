import { useState, FormEvent } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../constants/content';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div dir="rtl" className="border-t border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900 py-4 px-4 md:px-6">
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-3">
        
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={!message.trim() || isLoading}
          className={`p-3 rounded-full bg-primary-600 text-white ${
            !message.trim() || isLoading 
              ? 'opacity-60 cursor-not-allowed' 
              : 'hover:bg-primary-700'
          }`}
        >
          <Send size={20} />
        </motion.button>
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 dark:border-primary-700 bg-gray-50 dark:bg-primary-800 px-4 py-3 pl-12 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 resize-none text-right"
            placeholder={CONTENT.chatInput.placeholder}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute left-3 bottom-4">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-primary-800 ml-1"
            >
              <Mic size={20} />
            </button>
          </div>
        </div>
        <button
          type="button"
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-primary-800"
        >
          <Paperclip size={20} />
        </button>
      </form>
      
      <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        <a href="https://iyehah.com">{CONTENT.chatInput.developedBy}</a>
      </div>
    </div>
  );
};

export default ChatInput;
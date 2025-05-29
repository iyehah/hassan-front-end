import { useRef, useEffect } from 'react';
import MessageBubble, { Message } from './MessageBubble';
import { motion } from 'framer-motion';
import { CONTENT } from '../../constants/content';
import Icon from '../ui/Icon';
interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div dir='rtl' className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-8 py-6">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="max-w-md overflow-y-auto scrollbar-hide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=""
            >
              <div className="w-16 h-16 mx-auto dark:text-white text-black dark:bg-primary-800 rounded-full flex items-center justify-center">
                <Icon size={50} color="currentColor" />
                  {/* {CONTENT.messageBubble.avatars.ai} */}
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
            >
              {CONTENT.chatMessages.welcome.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-300 mb-8"
            >
              {CONTENT.chatMessages.welcome.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {CONTENT.chatMessages.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-600 cursor-pointer transition-colors text-right"
                >
                  <p className="text-sm text-gray-900 dark:text-gray-200">{suggestion}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex justify-end mb-6">
              <div className="max-w-[80%] md:max-w-[70%]">
                <div className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-primary-800 text-gray-900 dark:text-gray-100 rounded-tl-none inline-flex">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-start text-white mr-3 flex-shrink-0">
                <Icon size={30} color="#ffffff" />
                {/* {CONTENT.messageBubble.avatars.ai} */}
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
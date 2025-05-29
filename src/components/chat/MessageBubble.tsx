import { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../constants/content';
import Icon from '../ui/Icon';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const isUser = message.sender === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.div
      dir="rtl"
      className={`flex mb-6 ${isUser ? 'justify-start' : 'justify-end'}`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-primary-700 flex items-center justify-center text-primary-600 dark:text-primary-300 ml-3 flex-shrink-0">
          {CONTENT.messageBubble.avatars.user}
        </div>
      )}

      <div className="max-w-[80%] md:max-w-[70%]">
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary-600 text-white rounded-tr-none'
              : 'bg-primary-600 text-white rounded-tl-none'
          }`}
        >
          <p className="whitespace-pre-wrap text-right">{message.content.trim()}</p>
        </div>

        <div className={`flex mt-1 text-xs text-gray-500 dark:text-gray-400 ${isUser ? 'justify-start' : 'justify-end'}`}>
          <span>{new Date(message.timestamp).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {!isUser && (
          <div className="flex mt-2 space-x-2 items-center justify-end">
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-primary-800">
              <MoreHorizontal size={14} />
            </button>
            <button
              onClick={() => setFeedback('dislike')}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-primary-800 ${
                feedback === 'dislike'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <ThumbsDown size={14} />
            </button>
            <button
              onClick={() => setFeedback('like')}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-primary-800 ${
                feedback === 'like'
                  ? 'text-green-500 dark:text-green-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <ThumbsUp size={14} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-primary-800"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>

      {!isUser && (
        <div className=" max-w-fit max-h-fit p-0 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center text-white mr-3 flex-shrink-0">
          <Icon size={30} color="#ffffff" />
          {/* {CONTENT.messageBubble.avatars.ai} */}
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
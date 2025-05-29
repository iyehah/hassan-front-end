import { useState } from 'react';
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import { Message } from '../components/chat/MessageBubble';
import { v4 as uuidv4 } from 'uuid';
import { generateAIResponse } from '../services/replicateService';
import { CONTENT } from '../constants/content';

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const aiResponse = await generateAIResponse([...messages, newMessage]);

      const responseMessage: Message = {
        id: uuidv4(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError(CONTENT.chatPage.error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div dir="rtl" className="flex flex-col h-[calc(100vh-6rem)] bg-white dark:bg-primary-900 rounded-xl shadow-sm overflow-hidden">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-center">
          {error}
        </div>
      )}
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isTyping} />
    </div>
  );
};

export default ChatPage;
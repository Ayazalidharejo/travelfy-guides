import React, { useState, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import GeminiChat from '@/components/GeminiChat';

const StickyChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  const handleOpenChat = useCallback(() => {
    console.log('Opening chat...');
    setShowChat(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    console.log('Closing chat...');
    setShowChat(false);
  }, []);

  return (
    <>
      {/* Sticky Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpenChat}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-3 group"
          aria-label="Open chat support"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden group-hover:inline-block pr-2 font-semibold whitespace-nowrap">
            Need Help?
          </span>
        </button>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] shadow-2xl rounded-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white rounded-xl border-2 border-gray-200">
            {/* Modal Header with Close Button */}
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={handleCloseChat}
                className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Gemini Chat Component */}
            <div className="h-[500px] overflow-hidden">
              <GeminiChat onClose={handleCloseChat} />
            </div>
          </div>
        </div>
      )}

      {/* Background overlay when chat is open */}
      {showChat && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={handleCloseChat}
        />
      )}
    </>
  );
};

export default StickyChatButton;

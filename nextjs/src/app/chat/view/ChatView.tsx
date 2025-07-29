'use client';

// import {
//   useGetMessagesBySessionQuery,
//   useSendMessageMutation,
// } from '@/features/chat/useChatService';
// import { useState } from 'react';

const ChatView = () => {
  // const [message, setMessage] = useState('');
  // const params = { message, sessionId };

  // const { data: messagesBySession } = useGetMessagesBySessionQuery(sessionId);
  // const { mutate: sendMessage } = useSendMessageMutation(params);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto w-full">
          {/* Configuration Prompt Area */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
            <p>
              Hi ChatGPT! I'm working on a React project. How can I handle API errors gracefully
              when using fetch?
            </p>
          </div>
          {/* Korean User Query and AI Recommendation */}
          <div className="mb-8">
            <div className="text-zinc-300 mb-4">
              <p>
                Hi! Great question. When using fetch, you can catch both network errors and handle
                HTTP status codes manually. Here's a basic example:
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Input Bar */}
      <div className="border-t border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-4 flex items-center gap-3">
            {/* Input Field */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Feel free to ask anything"
                className="w-full bg-transparent text-white placeholder-zinc-400 outline-none text-lg"
              />
            </div>
            {/* Send Button */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

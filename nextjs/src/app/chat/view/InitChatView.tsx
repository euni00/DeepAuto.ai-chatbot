'use client';

import { sessionAtom, streamedMessageAtom } from '@/common/store/chatStore';
import { useSendMessageMutation } from '@/features/chat/useChatService';
import { useAtom } from 'jotai';
import { useState } from 'react';

const InitChatView = () => {
  const [message, setMessage] = useState('');
  const [, setStreamedMessage] = useAtom(streamedMessageAtom);
  const [sessionId, setSessionId] = useAtom(sessionAtom);
  const params = { message, sessionId: null };

  const { mutate: sendMessage } = useSendMessageMutation(
    params,
    setStreamedMessage,
    setMessage,
    sessionId,
    setSessionId
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-zinc-900 p-4">
      {/* Main Content */}
      <div className="flex flex-col items-center max-w-2xl w-full">
        {/* Central Prompt */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Hope you have an energetic day!
          </h1>
        </div>
        {/* Input Field */}
        <div className="w-full max-w-3xl">
          <div className="relative">
            <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-4 flex items-center gap-3">
              {/* Input Area */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Feel free to ask anything"
                  className="w-full bg-transparent text-white placeholder-zinc-400 outline-none text-lg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              {/* Send Button */}
              <button
                type="button"
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                onClick={() => sendMessage()}
              >
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

export default InitChatView;

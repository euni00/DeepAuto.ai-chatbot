'use client';

import { sessionAtom, streamedMessageAtom } from '@/common/store/chatStore';
import RoutingInfo from '@/components/RoutingInfo';
import SendButton from '@/components/SendButton';
import { Button } from '@/components/ui/button';
import { TOAST_MESSAGE } from '@/constants/toastMessages';
import {
  useGetMessagesBySessionQuery,
  useSendMessageMutation,
} from '@/features/chat/useChatService';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ChatView = ({ sessionId }: { sessionId: string }) => {
  const [message, setMessage] = useState('');
  const [streamedMessage, setStreamedMessage] = useAtom(streamedMessageAtom);
  const [, setSessionId] = useAtom(sessionAtom);
  const [isOpenRoutingInfo, setIsOpenRoutingInfo] = useState(false);

  const params = { message, sessionId };
  const { messagesBySession, isError } = useGetMessagesBySessionQuery(sessionId);
  const { mutate: sendMessage, isPending } = useSendMessageMutation(
    params,
    setStreamedMessage,
    setMessage,
    sessionId,
    setSessionId
  );

  if (isError) {
    toast.error(TOAST_MESSAGE.ERROR.GET_MESSAGES_BY_SESSIONS);
  }

  return (
    <div className="h-screen flex-1 flex flex-col text-zinc-100">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto w-full">
          {/* 1. Configuration Prompt Area */}
          {/* 2. AI Recommendation */}
          {messagesBySession?.map((item, index) => (
            <div key={index}>
              {item.role === 'user' ? (
                <div className="bg-zinc-800 border border-zinc-800 rounded-lg p-4 mb-6">
                  <p>{item.content}</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="text-zinc-300 mb-4">
                      <p>{item.content}</p>
                    </div>
                  </div>
                  {isOpenRoutingInfo && item.routing && <RoutingInfo routing={item.routing} />}
                </>
              )}
            </div>
          ))}
        </div>
        {/* Streaming message */}
        {isPending && streamedMessage && (
          <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
              <p>{message}</p>
            </div>
            <div className="mb-8">
              <div className="text-zinc-300 mb-4 animate-pulse">
                <p>{streamedMessage}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Routing Info Button */}
      <div className="sticky bottom-24 z-10 bg-zinc-900 pt-4 pb-2">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            className="text-sm border-zinc-600 text-black bg-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer"
            onClick={() => setIsOpenRoutingInfo((prev) => !prev)}
          >
            {isOpenRoutingInfo ? 'Hide Routing Info' : 'Show Routing Info'}
          </Button>
        </div>
      </div>
      {/* Chat Input Bar */}
      <div className="sticky bottom-0 border-t border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-4 flex items-center gap-3">
            {/* Input Field */}
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
            <SendButton onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

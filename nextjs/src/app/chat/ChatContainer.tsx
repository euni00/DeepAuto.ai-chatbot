'use client';

import { sessionAtom } from '@/common/store/chatStore';
import { useAtom } from 'jotai';
import ChatView from './view/ChatView';
import InitChatView from './view/InitChatView';

const ChatContainer = () => {
  const [sessionId] = useAtom(sessionAtom);

  return <>{sessionId === null ? <InitChatView /> : <ChatView />}</>;
};

export default ChatContainer;

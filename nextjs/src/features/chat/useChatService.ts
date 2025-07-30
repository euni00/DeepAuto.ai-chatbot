'use client';

import { useGetChatSessions, useGetMessagesBySession, useSendMessage } from '@/api/useChatQuery';
import { ISendMessageParams } from '@/common/type/chat';

const useGetChatSessionsQuery = () => {
  const { data: chatSessions } = useGetChatSessions();
  return chatSessions;
};

const useGetMessagesBySessionQuery = (sessionId: string) => {
  const { data: messagesBySession } = useGetMessagesBySession(sessionId);
  return messagesBySession;
};

const useSendMessageMutation = (params: ISendMessageParams) => {
  return useSendMessage(params, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
};

export { useGetChatSessionsQuery, useGetMessagesBySessionQuery, useSendMessageMutation };

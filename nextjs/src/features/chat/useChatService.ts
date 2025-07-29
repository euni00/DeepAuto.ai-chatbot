'use client';

import { useGetChatSessions, useGetMessagesBySession, useSendMessage } from '@/api/useChatQuery';
import { ISendMessageParams } from '@/common/type/chat';

const useGetChatSessionsQuery = () => {
  return useGetChatSessions({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
};

const useGetMessagesBySessionQuery = (sessionId: string) => {
  return useGetMessagesBySession(sessionId, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
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

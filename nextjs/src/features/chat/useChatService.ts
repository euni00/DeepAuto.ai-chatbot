'use client';

import chatQueryKey from '@/api/queryKeys';
import { useGetChatSessions, useGetMessagesBySession, useSendMessage } from '@/api/useChatQuery';
import { ISendMessageParams } from '@/common/type/chat';
import { useQueryClient } from '@tanstack/react-query';

const useGetChatSessionsQuery = () => {
  const { data: chatSessions } = useGetChatSessions();
  return chatSessions;
};

const useGetMessagesBySessionQuery = (sessionId: string) => {
  const { data: messagesBySession } = useGetMessagesBySession(sessionId);
  return messagesBySession;
};

const useSendMessageMutation = (
  params: ISendMessageParams,
  setStreamedMessage: (streamedMessage: string) => void,
  setMessage: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useSendMessage(params, setStreamedMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [chatQueryKey.getBySession, params.sessionId],
      });
      queryClient.invalidateQueries({
        queryKey: [chatQueryKey.get],
      });
      setStreamedMessage('');
      setMessage('');
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
};

export { useGetChatSessionsQuery, useGetMessagesBySessionQuery, useSendMessageMutation };

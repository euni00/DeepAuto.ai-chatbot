'use client';

import chatQueryKey from '@/api/queryKeys';
import { useGetChatSessions, useGetMessagesBySession, useSendMessage } from '@/api/useChatQuery';
import { ISendMessageParams } from '@/common/type/chat';
import { TOAST_MESSAGE } from '@/constants/toastMessages';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useGetChatSessionsQuery = () => {
  const { data: chatSessions, isError } = useGetChatSessions();
  return { chatSessions, isError };
};

const useGetMessagesBySessionQuery = (sessionId: string) => {
  const { data: messagesBySession, isError } = useGetMessagesBySession(sessionId);
  return { messagesBySession, isError };
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
    onError: () => {
      toast.error(TOAST_MESSAGE.ERROR.SEND_MESSAGES);
    },
  });
};

export { useGetChatSessionsQuery, useGetMessagesBySessionQuery, useSendMessageMutation };

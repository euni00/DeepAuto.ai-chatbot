'use client';

import { ISendMessageData, ISendMessageParams } from '@/common/type/chat';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { getChatSessionsData, getMessagesBySessionData, sendMessageData } from './api';
import chatQueryKey from './queryKeys';

const useGetChatSessions = () => {
  return useQuery({
    queryKey: [chatQueryKey.get],
    queryFn: getChatSessionsData,
  });
};

const useGetMessagesBySession = (sessionId: string) => {
  return useQuery({
    queryKey: [chatQueryKey.getBySession, sessionId],
    queryFn: () => getMessagesBySessionData(sessionId),
  });
};

const useSendMessage = (
  params: ISendMessageParams,
  setStreamedMessage: (streamedMessage: string) => void,
  option: UseMutationOptions<ISendMessageData, Error, void, unknown>
) => {
  return useMutation({
    mutationKey: [chatQueryKey.sendMessage],
    mutationFn: sendMessageData(params, setStreamedMessage),
    ...option,
  });
};

export { useGetChatSessions, useGetMessagesBySession, useSendMessage };

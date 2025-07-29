'use client';

import { ISendMessageParams } from '@/common/type/chat';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { getChatSessionsData, getMessagesBySessionData, sendMessageData } from './api';
import chatQueryKey from './queryKeys';

const useGetChatSessions = (option: UseMutationOptions) => {
  return useQuery({
    queryKey: [chatQueryKey.get],
    queryFn: getChatSessionsData,
    ...option,
  });
};

const useGetMessagesBySession = (sessionId: string, option: UseMutationOptions) => {
  return useQuery({
    queryKey: [chatQueryKey.getBySession],
    queryFn: () => getMessagesBySessionData(sessionId),
    ...option,
  });
};

const useSendMessage = (params: ISendMessageParams, option: UseMutationOptions) => {
  return useMutation({
    mutationKey: [chatQueryKey.sendMessage],
    mutationFn: sendMessageData(params),
    ...option,
  });
};

export { useGetChatSessions, useGetMessagesBySession, useSendMessage };

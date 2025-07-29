import {
  IChatSessionsData,
  IMessagesBySessionData,
  ISendMessageData,
  ISendMessageParams,
} from '@/common/type/chat';
import axios from 'axios';
import endpoints from './endpoints';

const { BASE_URL, CHAT, SESSIONS } = endpoints;

// Get all chat sessions API
const getChatSessionsData = async (): Promise<IChatSessionsData[]> => {
  const response = await axios.get(`${BASE_URL}/${CHAT}/${SESSIONS}`);
  return response.data;
};

// Get all chat sessions API
const getMessagesBySessionData = (sessionId: string) => {
  return async (): Promise<IMessagesBySessionData[]> => {
    const response = await axios.get(`${BASE_URL}/${CHAT}/${SESSIONS}/${sessionId}/messages`);
    return response.data;
  };
};

// Send message API
const sendMessageData = (params: ISendMessageParams) => {
  return async (): Promise<ISendMessageData[]> => {
    const response = await axios.get(`${BASE_URL}/${CHAT}/send`, { params });
    return response.data;
  };
};

export { getChatSessionsData, getMessagesBySessionData, sendMessageData };

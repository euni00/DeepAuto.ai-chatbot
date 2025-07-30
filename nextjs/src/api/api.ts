import { IChatSessionsData, IMessagesBySessionData, ISendMessageParams } from '@/common/type/chat';
import axios from 'axios';
import endpoints from './endpoints';

const { BASE_URL, CHAT, SESSIONS } = endpoints;

// Get all chat sessions API
const getChatSessionsData = async (): Promise<IChatSessionsData[]> => {
  const response = await axios.get(`${BASE_URL}/${CHAT}/${SESSIONS}`);
  return response.data;
};

// Get all chat sessions API
const getMessagesBySessionData = async (sessionId: string): Promise<IMessagesBySessionData[]> => {
  const response = await axios.get(`${BASE_URL}/${CHAT}/${SESSIONS}/${sessionId}/messages`);
  return response.data;
};

// Send message API
const sendMessageData = (
  params: ISendMessageParams,
  setStreamedMessage: (streamedMessage: string) => void
) => {
  return async () => {
    const response = await fetch(`${BASE_URL}/${CHAT}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));
      for (const line of lines) {
        const text = line.replace(/^data: /, '');
        result += text;
        setStreamedMessage(result);
      }
    }
  };
};

export { getChatSessionsData, getMessagesBySessionData, sendMessageData };

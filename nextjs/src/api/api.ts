import {
  IChatSessionsData,
  IMessagesBySessionData,
  ISendMessageData,
  ISendMessageParams,
} from '@/common/type/chat';
import { TOAST_MESSAGE } from '@/constants/toastMessages';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  return async (): Promise<ISendMessageData> => {
    const response = await fetch(`${BASE_URL}/${CHAT}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.body) {
      toast.error(TOAST_MESSAGE.ERROR.SEND_MESSAGES);
      throw new Error('Response body Error');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let result = '';
    let sessionId: string | null = null;
    let routing = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        const text = line.replace(/^data: /, '');

        try {
          const json = JSON.parse(text);

          if (json.type === 'sessionId') {
            sessionId = json.sessionId;
          } else if (json.type === 'routing') {
            routing = {
              selected: json.selected,
              grades: json.grades,
            };
          }
        } catch {
          result += text;
          setStreamedMessage(result);
        }
      }
    }

    return {
      sessionId: sessionId ?? '',
      routing,
    };
  };
};

export { getChatSessionsData, getMessagesBySessionData, sendMessageData };

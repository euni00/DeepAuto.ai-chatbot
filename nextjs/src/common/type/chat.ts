export interface IChatSessionsData {
  sessionId: string;
  title: string;
  createdAt: string;
}

export interface IMessagesBySessionData {
  role: string;
  content: string;
  createdAt: string;
}

export interface ISendMessageParams {
  message: string;
  sessionId: string | null;
}

export interface ISendMessageData {
  sessionId: string;
  routing: {
    selected: string;
    grades: {
      model: string;
      gradeLabel: string;
      gradeValue: number;
      score: number;
    }[];
  } | null;
}

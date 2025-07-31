export interface IChatSessionsData {
  sessionId: string;
  title: string;
  createdAt: string;
}

export interface IRoutingGrade {
  model: string;
  gradeLabel: string;
  gradeValue: number;
  score: number;
}

export interface IRoutingData {
  selected: string;
  grades: IRoutingGrade[];
}

export interface IMessagesBySessionData {
  role: string;
  content: string;
  createdAt: string;
  routing: {
    type: string;
    selected: string;
    grades: IRoutingGrade[];
  };
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

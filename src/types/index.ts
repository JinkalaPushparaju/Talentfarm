export interface Citation {
  title: string;
  url: string;
}

export interface Conversation {
  id: string;
  question: string;
  answer: string;
  citations: Citation[];
  timestamp: string;
  parentId?: string;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  conversations: Conversation[];
}
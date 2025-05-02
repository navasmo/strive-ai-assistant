export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: Date;
}

export interface ChatOption {
  id: string;
  text: string;
  action: string;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export type MessageType = 
  | 'text' 
  | 'options' 
  | 'resources' 
  | 'breathing' 
  | 'exercise' 
  | 'feedback';

export interface ResourceLink {
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
}

export interface ChatFeedback {
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

export interface BotResponse {
  message: string;
  type: MessageType;
  options?: ChatOption[];
  resources?: ResourceLink[];
}

export type ChatCategory = 
  | 'career' 
  | 'wellbeing' 
  | 'both';

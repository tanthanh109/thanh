export interface GuideStep {
  step: number;
  title: string;
  description: string;
  image: string;
  imageFallback?: string;
}

export interface GuideTopic {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  summary: string;
  category: string;
  stepCount: number;
  youtubeUrl?: string;
  steps: GuideStep[];
}

export interface HeaderData {
  bankName: string;
  portalTitle: string;
  logo: string;
  logoFallback: string;
  hotline: string;
}

export interface AdvisorData {
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  message: string;
}

export interface FeedbackConfig {
  question: string;
  successOption: string;
  helpOption: string;
  backToMenu: string;
  endChat: string;
  endChatMessage: string;
}

export interface ContentData {
  header: HeaderData;
  advisor: AdvisorData;
  feedback: FeedbackConfig;
  mainQuestion: string;
  mainSubtitle: string;
  topics: GuideTopic[];
}

export type UserFeedbackState = 'unanswered' | 'completed_ok' | 'needs_support' | 'ended';

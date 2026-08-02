export type SlackIntegrationStatus =
  | 'disconnected'
  | 'connected'
  | 'active'
  | 'error';

export interface SlackIntegration {
  status: SlackIntegrationStatus;
  workspaceName: string | null;
  channelId: string | null;
  channelName: string | null;
  errorMessage: string | null;
}

export interface SlackChannel {
  id: string;
  name: string;
  isPrivate: boolean;
}

export interface SlackChannelsPage {
  channels: SlackChannel[];
  nextCursor: string | null;
}

export interface SlackOAuthStart {
  authorizationUrl: string;
}

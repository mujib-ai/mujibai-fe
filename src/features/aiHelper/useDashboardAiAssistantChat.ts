'use client';

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTranslations } from 'next-intl';

type Reaction = 'like' | 'dislike' | null;
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reaction: Reaction;
};

export function useDashboardAiAssistantChat() {
  const t = useTranslations('aiAssistant');
  const [draft, setDraft] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 'welcome', role: 'assistant', content: t('welcome'), reaction: null },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const updateReaction = useCallback((id: string, reaction: Reaction) => {
    setMessages(current =>
      current.map(message =>
        message.id === id
          ? {
              ...message,
              reaction: message.reaction === reaction ? null : reaction,
            }
          : message
      )
    );
  }, []);

  const handleSend = useCallback(() => {
    const content = draft.trim();
    if (!content) return;
    const id = crypto.randomUUID();
    setMessages(current => [
      ...current,
      { id, role: 'user', content, reaction: null },
      {
        id: `${id}-reply`,
        role: 'assistant',
        content: t('placeholderReply'),
        reaction: null,
      },
    ]);
    setDraft('');
  }, [draft, t]);

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return {
    expanded,
    header: {
      title: t('title'),
      expandLabel: t(expanded ? 'collapse' : 'expand'),
      onExpand: () => setExpanded(value => !value),
    },
    messages: messages.map(message => ({
      ...message,
      copyLabel: t('copy'),
      likeLabel: t('like'),
      dislikeLabel: t('dislike'),
      onCopy: () => void navigator.clipboard?.writeText(message.content),
      onLike: () => updateReaction(message.id, 'like'),
      onDislike: () => updateReaction(message.id, 'dislike'),
    })),
    messagesEndRef,
    composer: {
      inputId: 'dashboard-ai-assistant-input',
      draft,
      setDraft,
      handleSend,
      handleInputKeyDown,
      canSend: draft.trim().length > 0,
      sendLabel: t('send'),
      attachLabel: t('attach'),
      placeholder: t('placeholder'),
    },
  };
}

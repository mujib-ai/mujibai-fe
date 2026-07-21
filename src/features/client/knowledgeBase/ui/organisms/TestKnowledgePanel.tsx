'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { Button, Card } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Search, TriangleAlert } from 'lucide-react';

import { KnowledgeBaseService } from '../../services/knowledge-base.service';

const INPUT_CLASS =
  'border-input placeholder:text-muted-foreground h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring';
const BUTTON_PRIMARY_CLASS =
  'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-50';

interface TestKnowledgePanelProps {
  knowledgeBaseId: string;
}

export default function TestKnowledgePanel({
  knowledgeBaseId,
}: TestKnowledgePanelProps) {
  const t = useTranslations('KnowledgeBase.testKnowledge');
  const [question, setQuestion] = useState('');

  const mutation = useMutation({
    mutationFn: (value: string) =>
      KnowledgeBaseService.testQuery(knowledgeBaseId, value),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!question.trim()) return;
    mutation.mutate(question.trim());
  };

  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <Card.Header className="flex flex-col gap-1.5 px-6">
        <Card.Title className="text-base font-semibold">
          {t('title')}
        </Card.Title>
        <p className="text-muted-foreground text-sm">{t('description')}</p>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4 px-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={question}
            onChange={event => setQuestion(event.target.value)}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            className={INPUT_CLASS}
          />
          <Button
            type="submit"
            isDisabled={mutation.isPending || !question.trim()}
            className={BUTTON_PRIMARY_CLASS}
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            {t('submit')}
          </Button>
        </form>

        {mutation.isError && (
          <p className="text-destructive text-sm">
            {getErrorMessage(mutation.error, t('submit'))}
          </p>
        )}

        {mutation.data && (
          <div className="flex flex-col gap-3">
            {mutation.data.hasRelevantInformation ? (
              <>
                <div>
                  <p className="text-muted-foreground text-xs">
                    {t('answerLabel')}
                  </p>
                  <p className="text-sm">{mutation.data.answer}</p>
                </div>
                {mutation.data.sources.length > 0 && (
                  <div>
                    <p className="text-muted-foreground text-xs">
                      {t('sourcesLabel')}
                    </p>
                    <ul className="mt-1 flex flex-col gap-2">
                      {mutation.data.sources.map(source => (
                        <li
                          key={`${source.sourceId}-${source.excerpt.slice(0, 20)}`}
                          className="border-border rounded-md border p-2 text-sm"
                        >
                          <p className="font-medium">{source.sourceName}</p>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {source.excerpt}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <TriangleAlert className="size-4 shrink-0" />
                {t('noRelevantInfo')}
              </div>
            )}
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

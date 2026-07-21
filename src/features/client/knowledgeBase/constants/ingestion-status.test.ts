import arDashboard from '@/i18n/messages/ar/dashboard.json';
import enDashboard from '@/i18n/messages/en/dashboard.json';

import {
  FINAL_INGESTION_STATUSES,
  INGESTION_STATUSES,
  INGESTION_STATUS_CONFIG,
  isFinalIngestionStatus,
} from './ingestion-status';

describe('ingestion status config', () => {
  it('has a badge config entry for every documented status', () => {
    INGESTION_STATUSES.forEach(status => {
      expect(INGESTION_STATUS_CONFIG[status]).toBeDefined();
      expect(['default', 'accent', 'success', 'danger', 'warning']).toContain(
        INGESTION_STATUS_CONFIG[status].color
      );
    });
  });

  it('flags only completed/failed/cancelled as final', () => {
    expect(FINAL_INGESTION_STATUSES).toEqual([
      'completed',
      'failed',
      'cancelled',
    ]);
    expect(isFinalIngestionStatus('processing')).toBe(false);
    expect(isFinalIngestionStatus('completed')).toBe(true);
    expect(isFinalIngestionStatus('failed')).toBe(true);
    expect(isFinalIngestionStatus('cancelled')).toBe(true);
  });

  it('marks only the intermediate processing stages as isProcessing', () => {
    const processingStatuses = INGESTION_STATUSES.filter(
      status => INGESTION_STATUS_CONFIG[status].isProcessing
    );
    expect(processingStatuses).toEqual([
      'processing',
      'extracting',
      'cleaning',
      'ai_classifying',
      'creating_documents',
      'chunking',
      'embedding',
      'indexing',
    ]);
  });

  it('has an English and Arabic label + description for every status', () => {
    const enStatus = (
      enDashboard as {
        KnowledgeBase: {
          status: Record<string, { label: string; description: string }>;
        };
      }
    ).KnowledgeBase.status;
    const arStatus = (
      arDashboard as {
        KnowledgeBase: {
          status: Record<string, { label: string; description: string }>;
        };
      }
    ).KnowledgeBase.status;

    INGESTION_STATUSES.forEach(status => {
      expect(enStatus[status]?.label).toBeTruthy();
      expect(enStatus[status]?.description).toBeTruthy();
      expect(arStatus[status]?.label).toBeTruthy();
      expect(arStatus[status]?.description).toBeTruthy();
    });
  });
});

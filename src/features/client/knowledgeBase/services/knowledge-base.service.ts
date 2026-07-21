import { AxiosAPI } from '@/shared/utils/axiosInstance';
import { AxiosError } from 'axios';

import type {
  ApiEnvelope,
  KnowledgeBase,
  KnowledgeBaseStats,
  TestKnowledgeResult,
} from '../types';

/** Applied to whatever the backend returns so `capabilities` and
 * `overallStatus` are always populated — the backend may not implement
 * these fields yet, and consumers should never need to optional-chain or
 * guard against `undefined` for them. */
const DEFAULT_CAPABILITIES: KnowledgeBase['capabilities'] = {
  manualText: false,
  retrievalTesting: false,
  maxFileSizeBytes: 25 * 1024 * 1024,
  supportedSourceTypes: ['pdf', 'txt', 'csv', 'excel'],
};

const VALID_OVERALL_STATUSES: KnowledgeBase['overallStatus'][] = [
  'ready',
  'processing',
  'attention_needed',
];

function normalizeKnowledgeBase(knowledgeBase: KnowledgeBase): KnowledgeBase {
  return {
    ...knowledgeBase,
    overallStatus: VALID_OVERALL_STATUSES.includes(knowledgeBase.overallStatus)
      ? knowledgeBase.overallStatus
      : 'ready',
    capabilities: {
      ...DEFAULT_CAPABILITIES,
      ...knowledgeBase.capabilities,
    },
  };
}

export class KnowledgeBaseService {
  static async getActive(): Promise<KnowledgeBase> {
    try {
      const { data } =
        await AxiosAPI.get<ApiEnvelope<KnowledgeBase>>('/knowledge-bases');
      return normalizeKnowledgeBase(data.data);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        const { data } =
          await AxiosAPI.get<ApiEnvelope<KnowledgeBase[]>>('/knowledge-bases');
        const [first] = data.data;
        if (first) return normalizeKnowledgeBase(first);
      }
      throw error;
    }
  }

  static async getStats(knowledgeBaseId: string): Promise<KnowledgeBaseStats> {
    const { data } = await AxiosAPI.get<ApiEnvelope<KnowledgeBaseStats>>(
      `/knowledge-bases/${knowledgeBaseId}/stats`
    );
    return data.data;
  }

  static async testQuery(
    knowledgeBaseId: string,
    question: string
  ): Promise<TestKnowledgeResult> {
    const { data } = await AxiosAPI.post<ApiEnvelope<TestKnowledgeResult>>(
      `/knowledge-bases/${knowledgeBaseId}/test-query`,
      { question }
    );
    return data.data;
  }
}

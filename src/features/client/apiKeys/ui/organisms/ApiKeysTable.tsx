'use client';

import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/components/atoms/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { useIsMobile } from '@/shared/hooks/use-mobile';

import { API_KEYS_CONSTANTS } from '../../constants';
import type { ApiKeyPublic } from '../../types';
import ApiKeyRowActions from '../atoms/ApiKeyRowActions';
import ApiKeysCardList from '../molecules/ApiKeysCardList';

interface ApiKeysTableProps {
  apiKeys: ApiKeyPublic[];
  onEdit: (apiKey: ApiKeyPublic) => void;
  onRotate: (apiKey: ApiKeyPublic) => void;
  onRevoke: (apiKey: ApiKeyPublic) => void;
  locale: string;
  headers: {
    name: string;
    secretKey: string;
    environment: string;
    status: string;
    scopes: string;
    createdOn: string;
    expiresAt: string;
    lastUsed: string;
    actions: string;
  };
}

export default function ApiKeysTable({
  apiKeys,
  onEdit,
  onRotate,
  onRevoke,
  locale,
  headers,
}: ApiKeysTableProps) {
  const t = useTranslations('APIKeys');
  const isMobile = useIsMobile();
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  if (isMobile) {
    return (
      <ApiKeysCardList
        apiKeys={apiKeys}
        onEdit={onEdit}
        onRotate={onRotate}
        onRevoke={onRevoke}
        headers={headers}
      />
    );
  }

  return (
    <Table className="my-10 bg-white dark:bg-[#00143473]">
      <TableHeader>
        <TableRow>
          <TableHead className={alignClass}>{headers.name}</TableHead>
          <TableHead className={alignClass}>{headers.secretKey}</TableHead>
          <TableHead className={alignClass}>{headers.environment}</TableHead>
          <TableHead className={alignClass}>{headers.status}</TableHead>
          <TableHead className={alignClass}>{headers.scopes}</TableHead>
          <TableHead className={alignClass}>{headers.createdOn}</TableHead>
          <TableHead className={alignClass}>{headers.expiresAt}</TableHead>
          <TableHead className={alignClass}>{headers.lastUsed}</TableHead>
          <TableHead className={alignClass}>{headers.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys.map(apiKey => (
          <TableRow key={apiKey.id}>
            <TableCell>{apiKey.name}</TableCell>
            <TableCell className="font-mono text-xs">
              {apiKey.keyPrefix}
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {t(`environments.${apiKey.environment}`)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={API_KEYS_CONSTANTS.STATUS_BADGE_VARIANT[apiKey.status]}
              >
                {t(`statuses.${apiKey.status}`)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {apiKey.scopes.map(scope => (
                  <Badge key={scope} variant="secondary">
                    {t(`scopes.${scope}`)}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {new Date(apiKey.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {apiKey.expiresAt
                ? new Date(apiKey.expiresAt).toLocaleDateString()
                : '-'}
            </TableCell>
            <TableCell>
              {apiKey.lastUsedAt
                ? new Date(apiKey.lastUsedAt).toLocaleDateString()
                : t('lastUsedNever')}
            </TableCell>
            <TableCell>
              <ApiKeyRowActions
                apiKey={apiKey}
                onEdit={onEdit}
                onRotate={onRotate}
                onRevoke={onRevoke}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

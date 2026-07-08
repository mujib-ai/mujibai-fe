'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import type { ApiKey } from '../../types';
import ApiKeyRowActions from '../atoms/ApiKeyRowActions';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
  locale: string;
  headers: {
    name: string;
    secretKey: string;
    createdOn: string;
    createdBy: string;
    lastUsed: string;
    permission: string;
    actions: string;
  };
}

export default function ApiKeysTable({
  apiKeys,
  onEdit,
  onDelete,
  locale,
  headers,
}: ApiKeysTableProps) {
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  return (
    <Table className="my-10 bg-white dark:bg-[#00143473]">
      <TableHeader>
        <TableRow>
          <TableHead className={alignClass}>{headers.name}</TableHead>
          <TableHead className={alignClass}>{headers.secretKey}</TableHead>
          <TableHead className={alignClass}>{headers.createdOn}</TableHead>
          <TableHead className={alignClass}>{headers.createdBy}</TableHead>
          <TableHead className={alignClass}>{headers.lastUsed}</TableHead>
          <TableHead className={alignClass}>{headers.permission}</TableHead>
          <TableHead className={alignClass}>{headers.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys.map(apiKey => (
          <TableRow key={apiKey.id}>
            <TableCell>{apiKey.name}</TableCell>
            <TableCell>{apiKey.key}</TableCell>
            <TableCell>
              {apiKey.createdAt
                ? new Date(apiKey.createdAt).toLocaleDateString()
                : '-'}
            </TableCell>
            <TableCell>{apiKey.createdBy}</TableCell>
            <TableCell>
              {apiKey.lastUsed
                ? new Date(apiKey.lastUsed).toLocaleDateString()
                : '-'}
            </TableCell>
            <TableCell>{apiKey.permissions?.join(', ')}</TableCell>
            <TableCell>
              <ApiKeyRowActions
                apiKey={apiKey}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

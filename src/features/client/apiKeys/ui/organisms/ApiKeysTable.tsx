'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';
import { cn } from '@/shared/lib/utils';
import { Switch } from '@/shared/components/atoms/ui/switch';

import ApiKeyRowActions from '../atoms/ApiKeyRowActions';
import type { ApiKey } from '../../types';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
  onRevoke: (id: string) => void;
  locale: string;
  headers: {
    name: string;
    secretKey: string;
    createdOn: string;
    lastUsed: string;
    actions: string;
    status: string;
  };
}

export default function ApiKeysTable({
  apiKeys,
  onEdit,
  onDelete,
  onRevoke,
  locale,
  headers,
}: ApiKeysTableProps) {
  const alignClass = locale === 'ar' ? 'text-right' : 'text-left';

  return (
    <Table className="my-10 bg-white dark:bg-[#00143473]">
      <TableHeader className="bg-[#001434A6]">
        <TableRow className="border-b border-[#06B6D433]">
          <TableHead className={cn('text-white font-semibold', alignClass)}>{headers.name}</TableHead>
          <TableHead className={cn('text-white font-semibold', alignClass)}>{headers.secretKey}</TableHead>
          <TableHead className={cn('text-white font-semibold', alignClass)}>{headers.createdOn}</TableHead>
          <TableHead className={cn('text-white font-semibold', alignClass)}>{headers.lastUsed}</TableHead>
          <TableHead className={cn('text-white font-semibold', alignClass)}>{headers.status}</TableHead>
          <TableHead className={cn('text-white font-semibold text-right', alignClass)}>{headers.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys.map(apiKey => (
          <TableRow key={apiKey.id} className="border-b border-[#06B6D41A] hover:bg-[#06B6D40D]">
            <TableCell className="text-white/80">{apiKey.name}</TableCell>
            <TableCell className="text-white/80">
              <code className="bg-[#00244F] px-2 py-1 rounded text-cyan-400 text-xs">
                {apiKey.keyPrefix}...
              </code>
            </TableCell>
            <TableCell className="text-white/80">
              {apiKey.createdAt
                ? new Date(apiKey.createdAt).toLocaleDateString()
                : '-'}
            </TableCell>
            <TableCell className="text-white/80">
              {apiKey.lastUsedAt
                ? new Date(apiKey.lastUsedAt).toLocaleDateString()
                : '-'}
            </TableCell>
            <TableCell>
              <Switch
                checked={apiKey.isActive}
                onCheckedChange={() => onRevoke(apiKey.id)}
                // disabled={!apiKey.isActive} // If already revoked, maybe don't allow re-activating if the endpoint is only for revoking
              />
            </TableCell>
            <TableCell className="text-right">
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

'use client';

import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/atoms/ui/table';

import type { VoiceScript } from '../../services/voiceScript.service';

interface VoiceScriptTableProps {
  scripts: VoiceScript[];
  onEdit: (script: VoiceScript) => void;
  onDelete: (id: string | number) => void;
}

export default function VoiceScriptTable({
  scripts,
  onEdit,
  onDelete,
}: VoiceScriptTableProps) {
  const t = useTranslations('VoiceScripts');

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-xl font-bold text-white mb-2">
        {t('keywordBasedReplies') || 'Keyword-based Replies'}
      </h3>
      <div className="overflow-hidden rounded-2xl border border-[#06B6D433] bg-[#00143473]">
      <Table>
        <TableHeader className="bg-[#001434A6]">
          <TableRow className="border-b border-[#06B6D433] hover:bg-transparent">
            <TableHead className="text-white font-semibold py-4 px-6">{t('triggerKeyword')}</TableHead>
            <TableHead className="text-white font-semibold py-4 px-6">{t('apiQuestion')}</TableHead>
            <TableHead className="text-white font-semibold py-4 px-6">{t('aiResponseLabel')}</TableHead>
            <TableHead className="text-white font-semibold py-4 px-6 text-right">{t('actions') || 'Actions'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scripts.map((script) => (
            <TableRow key={script.id} className="border-b border-[#06B6D41A] hover:bg-[#06B6D40D] transition-colors">
              <TableCell className="text-white/80 py-4 px-6">
                {script.keywords.join(', ') || '—'}
              </TableCell>
              <TableCell className="text-white/80 py-4 px-6 max-w-md truncate">
                {script.question}
              </TableCell>
              <TableCell className="text-white/80 py-4 px-6 max-w-md truncate">
                {script.answer}
              </TableCell>
              <TableCell className="text-right py-4 px-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-[#06B6D41A]">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#001434E0] border-[#06B6D433] text-white">
                    <DropdownMenuItem 
                      onClick={() => onEdit(script)}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      {t('edit') || 'Edit'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(script.id)}
                      className="cursor-pointer flex items-center gap-2 text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                      {t('delete') || 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}

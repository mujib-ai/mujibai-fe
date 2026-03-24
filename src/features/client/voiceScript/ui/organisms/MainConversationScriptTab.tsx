'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import useDeleteVoiceScript from '../../hooks/useDeleteVoiceScript';
import useVoiceScripts from '../../hooks/useVoiceScripts';
import { VoiceScript } from '../../services/voiceScript.service';
import EmptyScriptCard from '../molecules/EmptyScriptCard';
import ScriptActionButtons from '../molecules/ScriptActionButtons';
import CreateScriptDialog from './CreateScriptDialog';
import DeleteScriptDialog from './DeleteScriptDialog';
import VoiceScriptTable from './VoiceScriptTable';

export default function MainConversationScriptTab({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingScript, setEditingScript] = useState<VoiceScript | null>(null);
  const [scriptToDelete, setScriptToDelete] = useState<string | number | null>(null);

  const { data: scripts, isLoading } = useVoiceScripts();

  const { mutate: deleteScript, isPending: isDeleting } = useDeleteVoiceScript();

  const handleEdit = (script: VoiceScript) => {
    setEditingScript(script);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingScript(null);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string | number) => {
    setScriptToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (scriptToDelete) {
      deleteScript(scriptToDelete, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setScriptToDelete(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  const hasScripts = scripts && scripts.length > 0;

  return (
    <div>
      {!hasScripts ? (
        <EmptyScriptCard
          title={t('conversationScript')}
          heading={t('noConversationScriptAvailable')}
          description={t('startByAddingYourFirstConversationScript')}
          locale={locale}
        />
      ) : (
        <VoiceScriptTable
          scripts={scripts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ScriptActionButtons
        addNewLineText={t('addNewLine')}
        onAddNewLine={handleCreate}
      />

      <CreateScriptDialog
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open);
          if (!open) setEditingScript(null);
        }}
        t={t}
        mode={editingScript ? 'edit' : 'create'}
        initialValues={editingScript}
      />

      <DeleteScriptDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        t={t}
        isLoading={isDeleting}
      />
    </div>
  );
}

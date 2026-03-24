import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { VoiceScriptService, VoiceScriptValues } from '../services/voiceScript.service';

export default function useUpdateVoiceScript() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string | number; values: Partial<VoiceScriptValues> }) =>
      VoiceScriptService.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voiceScripts'] });
    },
    onError: () => {
    },
  });
}

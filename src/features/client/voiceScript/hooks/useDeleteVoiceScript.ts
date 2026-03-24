import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { VoiceScriptService } from '../services/voiceScript.service';

export default function useDeleteVoiceScript() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: VoiceScriptService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voiceScripts'] });
    },
    onError: () => {
    },
  });
}

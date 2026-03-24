import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VoiceScriptService, VoiceScriptValues } from '../services/voiceScript.service';

export default function useCreateVoiceScript() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: VoiceScriptValues) => VoiceScriptService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voiceScripts'] });
    },
  });
}

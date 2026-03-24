import { useQuery } from '@tanstack/react-query';
import { VoiceScriptService } from '../services/voiceScript.service';

export default function useVoiceScripts() {
  return useQuery({
    queryKey: ['voiceScripts'],
    queryFn: VoiceScriptService.getAll,
  });
}

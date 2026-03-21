import { useAuth } from '@/features/auth';
import { AxiosAPI } from '@/shared/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface ClientResponse {
  data: unknown;
  message?: string;
}

const getClient = async (userId: string): Promise<ClientResponse> => {
  const { data } = await AxiosAPI.get<ClientResponse>(`/client/${userId}`);
  return data;
};

export default function useClient() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['client', user?.id],
    queryFn: () => getClient(user?.id as string),
    enabled: !!user?.id,
  });

  console.log('data', data);
  return {
    client: data?.data,
  };
}

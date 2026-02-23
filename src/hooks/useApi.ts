import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  user_id: string;
  created_at: string;
}

export interface Contract {
  id: string;
  gig_id: string;
  user_id: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  created_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  freelancer_id: string;
  price: number;
  created_at: string;
}

export interface Message {
  id: string;
  contract_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  contract_id: string;
  other_user_id: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export function useAuthUser(token: string | undefined) {
  return useQuery<User, ApiError>({
    queryKey: ['auth-user'],
    queryFn: () => api.get<User>('/auth/me', token!),
    enabled: !!token,
  });
}

export function useCompleteProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { username?: string; role?: string; display_name?: string }) =>
      api.post<User>('/auth/complete-profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; username?: string; display_name?: string; avatar_url?: string; role?: string }) =>
      api.put<User>(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
}

export function useGigs(token?: string) {
  return useQuery<Gig[], ApiError>({
    queryKey: ['gigs'],
    queryFn: () => api.get<Gig[]>('/gigs', token),
  });
}

export function useGig(id: string, token?: string) {
  return useQuery<Gig, ApiError>({
    queryKey: ['gig', id],
    queryFn: () => api.get<Gig>(`/gigs/${id}`, token!),
    enabled: !!token,
  });
}

export function useUserGigs(userId: string, token?: string) {
  return useQuery<Gig[], ApiError>({
    queryKey: ['user-gigs', userId],
    queryFn: () => api.get<Gig[]>(`/gigs/user/${userId}`, token!),
    enabled: !!token,
  });
}

export function useCreateGig() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { title: string; description: string; price: number }) =>
      api.post<Gig>('/gigs', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });
}

export function useUpdateGig() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; title?: string; description?: string; price?: number }) =>
      api.put<Gig>(`/gigs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });
}

export function useDeleteGig() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });
}

export function useContracts(token?: string) {
  return useQuery<Contract[], ApiError>({
    queryKey: ['contracts'],
    queryFn: () => api.get<Contract[]>('/contracts', token!),
    enabled: !!token,
  });
}

export function useCreateContract() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { gig_id: string }) =>
      api.post<Contract>('/contracts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
}

export function useUpdateContractStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'Accepted' | 'Rejected' }) =>
      api.put<Contract>(`/contracts/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
}

export function useDeleteContract() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/contracts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
}

export function usePortfolios(token?: string) {
  return useQuery<Portfolio[], ApiError>({
    queryKey: ['portfolios'],
    queryFn: () => api.get<Portfolio[]>('/portfolios', token!),
    enabled: !!token,
  });
}

export function useFreelancerPortfolios(freelancerId: string, token?: string) {
  return useQuery<Portfolio[], ApiError>({
    queryKey: ['freelancer-portfolios', freelancerId],
    queryFn: () => api.get<Portfolio[]>(`/portfolios/freelancer/${freelancerId}`, token!),
    enabled: !!token,
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { title: string; description: string; freelancer_id: string; price: number }) =>
      api.post<Portfolio>('/portfolios', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; title?: string; description?: string; price?: number }) =>
      api.put<Portfolio>(`/portfolios/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/portfolios/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
}

export function useConversations(token?: string) {
  return useQuery<Conversation[], ApiError>({
    queryKey: ['conversations'],
    queryFn: () => api.get<Conversation[]>('/chat/conversations', token!),
    enabled: !!token,
  });
}

export function useMessages(contractId: string, token?: string) {
  return useQuery<Message[], ApiError>({
    queryKey: ['messages', contractId],
    queryFn: () => api.get<Message[]>(`/chat/${contractId}/messages`, token!),
    enabled: !!token,
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, token }: { id: string; token?: string }) => 
      api.put<Message>(`/chat/messages/${id}/read`, {}, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

export function useUsers(token?: string) {
  return useQuery<User[], ApiError>({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/users', token!),
    enabled: !!token,
  });
}

export function useUser(id: string, token?: string) {
  return useQuery<User, ApiError>({
    queryKey: ['user', id],
    queryFn: () => api.get<User>(`/users/${id}`, token!),
    enabled: !!token,
  });
}

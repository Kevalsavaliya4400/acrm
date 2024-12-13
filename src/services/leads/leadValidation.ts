import type { CreateLeadDTO, UpdateLeadDTO } from './types';

export const leadValidation = {
  validateCreate: (data: CreateLeadDTO): string | null => {
    if (!data.name?.trim()) return 'Name is required';
    if (!data.email?.trim()) return 'Email is required';
    if (!data.phone?.trim()) return 'Phone is required';
    if (!data.source?.trim()) return 'Source is required';
    if (data.budget && data.budget < 0) return 'Budget must be positive';
    return null;
  },

  validateUpdate: (data: UpdateLeadDTO): string | null => {
    if (data.name !== undefined && !data.name.trim()) return 'Name cannot be empty';
    if (data.email !== undefined && !data.email.trim()) return 'Email cannot be empty';
    if (data.phone !== undefined && !data.phone.trim()) return 'Phone cannot be empty';
    if (data.budget !== undefined && data.budget < 0) return 'Budget must be positive';
    return null;
  }
};
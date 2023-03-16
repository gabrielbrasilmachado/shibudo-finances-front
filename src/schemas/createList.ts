import { z } from 'zod';

export const createListSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  month: z.enum(
    [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ],
    { errorMap: (issue, ctx) => ({ message: 'Campo obrigatório' }) }
  ),
  year: z.enum(
    ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    { errorMap: (issue, ctx) => ({ message: 'Campo obrigatório' }) }
  ),
});

export type ICreateListSchema = z.infer<typeof createListSchema>;

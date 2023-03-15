import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Campo obrigatório')
      .email('Deve ser um e-mail válido'),
    password: z.string().min(1, 'Campo obrigatório'),
  })
  .required();

export type ILoginSchema = z.infer<typeof loginSchema>;

import { z } from 'zod';

const aceptedImages = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const maxFileSize = 300000;

export const registerSchema = z
  .object({
    username: z.string().min(1, 'Campo obrigatório'),
    first_name: z.string().min(1, 'Campo obrigatório'),
    email: z
      .string()
      .min(1, 'Campo obrigatório')
      .email('Deve ser um e-mail válido'),
    password: z
      .string()
      .min(8, 'Deve conter ao menos 8 caracteres')
      .regex(
        new RegExp('.*[A-Z].*'),
        'Deve conter ao menos uma letra maiúscula'
      )
      .regex(
        new RegExp('.*[!@#$&*].*'),
        'Deve conter ao menos um caractere especial'
      )
      .regex(new RegExp('.*[0-9].*'), 'Deve conter ao menos um número'),
    confirmPassword: z.string().min(1, 'Campo obrigatório'),
    image: z
      .any()
      .refine((files) => Boolean(files?.length == 1), 'Campo obrigatório')
      .refine(
        (files) => Boolean(files?.[0]?.size <= maxFileSize),
        'A imagem deve ter no máximo 3MB'
      )
      .refine(
        (files) => Boolean(aceptedImages.includes(files?.[0]?.type)),
        'A imagem deve ser de um dos tipos .jpeg, .jpg, .png ou .webp'
      ),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas devem ser iguais!',
  });

export type IRegisterSchema = z.infer<typeof registerSchema>;

import { isAfter, parse, subYears } from 'date-fns'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(4, {
        message:
          'Your username should only contain between 4 and 16 numbers and letters',
      })
      .max(16, {
        message:
          'Your username should only contain between 4 and 16 numbers and letters',
      }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      })
      .toLowerCase(),
    birth: z.string().refine(
      (data) => {
        const mask = 'dd/MM/yyyy'
        const parsedDate = parse(data, mask, new Date())
        const handredYearAgo = subYears(new Date(), 100)

        return isAfter(parsedDate, handredYearAgo)
      },
      {
        message: 'Invalid birthdate',
      },
    ),
    country: z
      .string()
      .min(1, {
        message: 'Country is required',
      })
      .toLowerCase()
      .refine((value) => value !== 'none', {
        message: 'Country is required',
      }),
    password: z.string(),
    confirmPassword: z.string(),
    termsAndConditions: z.boolean().refine((value) => value, {
      message: 'First you need to agree with Terms & Conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      const isValid =
        data.password.length >= 8 &&
        /[A-Z]/.test(data.password) &&
        /\d/.test(data.password)

      return isValid
    },
    {
      message: 'Invalid format',
    },
  )

export type SignUpData = z.infer<typeof signUpSchema>

import { z } from "zod";
import 'dotenv/config'

// openssl genpkey -algorithm RSA -out private_key.pem && openssl rsa -pubout -in private_key.pem -out public_key.pem
// base64 -w 0 private_key.pem > private_key_base64.txt && base64 -w 0 public_key.pem > public_key_base64.txt

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_SECRET_ALG: z.string().optional().default('RS256'),
  OPENAI_API_KEY: z.string()
})

type EnvSchema = z.infer<typeof envSchema>
type EnvKeys = keyof EnvSchema

export const env = envSchema.parse(process.env)

export { type EnvSchema, type EnvKeys }
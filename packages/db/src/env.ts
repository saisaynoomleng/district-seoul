import 'dotenv/config';
import * as z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().startsWith('postgresql://'),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    error.issues.forEach((err) => {
      const path = err.path.join('.');
      console.error(`${path}: ${err.message}`);
    });
  }

  throw error;
}

export default env;

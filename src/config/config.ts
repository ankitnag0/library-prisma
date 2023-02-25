import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV as string,
  port: parseInt(process.env.PORT as string, 10),
  postgresurl: process.env.DATABASE_URL as string,
  jwtsecret: process.env.JWT_SECRET as string,
};

export default config;
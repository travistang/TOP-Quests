export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    path: process.env.DATABASE_PATH,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  },
  auth: {
    header: process.env.AUTH_HEADER,
    apiToken: process.env.API_TOKEN,
  },
});

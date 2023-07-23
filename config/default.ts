export default {
  mongo: {
    url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@dev-o-tut.ic9henw.mongodb.net`,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
  saltWorkFactor: process.env.SALT_WORK_FACTOR ? Number(process.env.SALT_WORK_FACTOR) : 10,
  env: process.env.NODE_ENV,
};

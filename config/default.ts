export default {
  mongo: {
    url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@dev-o-tut.ic9henw.mongodb.net`,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
};

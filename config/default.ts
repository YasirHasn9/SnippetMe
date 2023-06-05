export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@dev-o-tut.ic9henw.mongodb.net/?retryWrites=true&w=majority`,
};

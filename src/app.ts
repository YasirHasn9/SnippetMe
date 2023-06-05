import "dotenv/config";
import express from "express";
import config from "config";
import connect from "./utils/connect";
import routes from "./routes";

const app = express();
const port: number = config.get("port");

app.listen(port, () => {
  console.log(`  App running on: ${port}`);
  connect();
  routes(app);
});

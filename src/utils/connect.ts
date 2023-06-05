// connecting the db
import mongoose, { Error } from "mongoose";
import config from "config";
import log from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info("Killer: You are connected");
  } catch (err: unknown) {
    log.error("Not connected");
    process.exit(1);
  }
  return;
}
export default connect;

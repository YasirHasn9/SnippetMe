import { Express, Response } from "express";

function routes(app: Express) {
  // HEALTH CHECK
  app.get("/ping", (_, res: Response) => {
    res.status(200).send({ msg: "Pong" });
  });
}
export default routes;

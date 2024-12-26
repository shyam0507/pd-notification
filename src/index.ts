import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World, from pd-notification!");
});

app.listen(3007, () => {
  console.log("Server is running on port 3007");
});

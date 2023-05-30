import "reflect-metadata";
import express from "express";
import cors from "cors";
import dataSource from "./utils";
import wilderController from "./controller/wilder";
import skillController from "./controller/skill";
import gradeController from "./controller/grade";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/wilder", wilderController.read);
app.post("/api/wilder", wilderController.create);

app.get("/api/skill", skillController.read);
app.post("/api/skill", skillController.create);

app.post("/api/grade", gradeController.create);

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
};

void start();

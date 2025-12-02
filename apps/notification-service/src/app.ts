import { Application } from "express";
import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes";
import { consumer } from "./utils/kafka";
const app: Application = express();

app.use(
  cors({
    origin: [`${process.env.AUTH_ORIGIN}`],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/api/v1", router);

// consumer.subscribe("auth-service", async (message) => {
//   console.log(message.value);
// });

export default app;

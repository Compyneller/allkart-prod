import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import Routes from "./routes";
interface CustomError extends Error {
  status?: number;
}
const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || "http://localhost:5001"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/v1/dashboard", Routes);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const isProd = (process.env.NODE_ENV = "production");

    res.status(error.status || 500).json({
      message: error.message,
      error,
    });
    return;
  }
);

export default app;

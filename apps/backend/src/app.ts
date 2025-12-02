import { auth } from "@repo/auth";
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import Routes from "./routes/index";
import { ApiError } from "@repo/express-middleware";

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || "http://localhost:5001"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", Routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
      success: false,
      errors: err.errors,
    });
  }

  // For any other type of error, return a generic 500 server error
  console.error(err);
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
    success: false,
    errors: [],
  });
});

export default app;

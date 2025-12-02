import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import type {
  Application,
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";
import proxy from "express-http-proxy";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import Routes from "./routes/index";
interface CustomError extends Error {
  status?: number;
}
const app: Application = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || "http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(morgan("dev"));
app.all("/api/auth/*splat", proxy(`${process.env.BASE_URL}/api/auth/*splat`));
app.use(
  express.json({
    limit: "1mb",
  })
);
app.use(
  express.urlencoded({
    limit: "1mb",
    extended: true,
  })
);
app.use(cookieParser());
app.set("trust proxy", 1);

// ---------------------------------------------------rate limiting ---------------------------------------------

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: {
    error: "Too many requests, please try again later!",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter as RequestHandler);

app.use("/api/v1", Routes);

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

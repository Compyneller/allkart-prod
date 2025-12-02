import { auth } from "@repo/auth";
import { ApiError } from "@repo/express-middleware";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userRole?: string;
      userId?: string;
    }
  }
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new ApiError("Unauthorized Access", { status: 401 });
    }


    req.userRole = session.user.role!;
    req.userId = session.user.id;

    next();
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { status: 400, stack: error.stack });
    }

    throw new ApiError("Something wrong", { status: 500 });
  }
};

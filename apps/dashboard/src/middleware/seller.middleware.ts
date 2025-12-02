import { auth } from "@repo/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const checkSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (session && session.user.role === "USER") {
      return res.status(403).json({
        message: "Forbidden: Access is allowed for sellers or admin only",
        success: false,
      });
    }

    req.userId = session.user.id;

    next();
  } catch (error) {
    console.error("Error in seller middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

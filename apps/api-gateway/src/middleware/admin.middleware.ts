import { auth } from "@repo/auth";
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

export const checkAdmin = async (
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

    if (session && session.user.role != "admin") {
      return res.status(403).json({
        message: "Forbidden: Access is allowed for admin only",
        success: false,
      });
    }
    req.userRole = session.user.role!;
    req.userId = session.user.id;

    next();
  } catch (error) {
    console.error("Error in seller middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

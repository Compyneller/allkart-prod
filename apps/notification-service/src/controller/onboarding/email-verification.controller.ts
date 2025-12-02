import type { Request, Response } from "express";
import { sendEmail } from "../../helper/sendEmail";
import ejs from "ejs";
export const emailVerificationController = async (
  req: Request,
  res: Response
) => {
  const body = req.body;
  try {
    console.log(__dirname);

    const html = await ejs.renderFile("src/views/onboarding/verification.ejs");

    const info = await sendEmail({
      to: "mikoton374@capiena.com",
      subject: "Allkart email Verification",
      body: html,
    });
    console.log(info);

    return res.status(200).json({
      info,
    });
  } catch (error: any) {
    return res.status(503).json({
      message: error.message,
    });
  }
};

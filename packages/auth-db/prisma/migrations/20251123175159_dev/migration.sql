/*
  Warnings:

  - A unique constraint covering the columns `[aadhar,pancard,gst,userId]` on the table `sellerdocuments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sellerdocuments_aadhar_pancard_gst_userId_key" ON "sellerdocuments"("aadhar", "pancard", "gst", "userId");

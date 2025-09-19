/*
  Warnings:

  - You are about to drop the column `used` on the `PasswordReset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."PasswordReset" DROP COLUMN "used";

/*
  Warnings:

  - You are about to drop the `UserNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserNotification" DROP CONSTRAINT "UserNotification_notificationID_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserNotification" DROP CONSTRAINT "UserNotification_userID_fkey";

-- DropTable
DROP TABLE "public"."UserNotification";

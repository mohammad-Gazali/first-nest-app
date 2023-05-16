/*
  Warnings:

  - You are about to drop the column `firtname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firtname",
ADD COLUMN     "firstname" TEXT;

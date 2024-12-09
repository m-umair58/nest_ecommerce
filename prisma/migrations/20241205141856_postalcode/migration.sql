/*
  Warnings:

  - You are about to drop the column `postCode` on the `Billing` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "postCode",
ADD COLUMN     "postalCode" TEXT NOT NULL;

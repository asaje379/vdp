/*
  Warnings:

  - You are about to drop the column `closed` on the `IndividualPaiement` table. All the data in the column will be lost.
  - You are about to drop the column `isClosing` on the `IndividualPaiement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Individual" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isClosing" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "IndividualPaiement" DROP COLUMN "closed",
DROP COLUMN "isClosing";

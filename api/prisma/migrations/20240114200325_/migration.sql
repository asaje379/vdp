-- AlterTable
ALTER TABLE "AnnualOwner" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isClosing" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "IndividualPaiement" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isClosing" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "EndTontine" ADD COLUMN     "annualId" TEXT,
ADD COLUMN     "individualId" TEXT;

-- AddForeignKey
ALTER TABLE "EndTontine" ADD CONSTRAINT "EndTontine_annualId_fkey" FOREIGN KEY ("annualId") REFERENCES "Annual"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndTontine" ADD CONSTRAINT "EndTontine_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "Individual"("id") ON DELETE SET NULL ON UPDATE CASCADE;

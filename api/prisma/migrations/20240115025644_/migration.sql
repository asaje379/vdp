-- CreateTable
CREATE TABLE "EndTontine" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "receiver" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EndTontine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EndTontine" ADD CONSTRAINT "EndTontine_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

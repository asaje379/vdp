-- CreateTable
CREATE TABLE "Annual" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "label" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL DEFAULT 'WEEK',
    "penalityAmount" INTEGER NOT NULL DEFAULT 500,
    "unitAmount" DOUBLE PRECISION NOT NULL,
    "unitAmountWithFees" DOUBLE PRECISION NOT NULL,
    "totalAmountToGive" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "benefice" DOUBLE PRECISION NOT NULL,
    "periodSize" INTEGER NOT NULL DEFAULT 48,
    "startAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Annual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnualOwner" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "annualId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "currentlyPaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "AnnualOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnualOwnerPaiement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "annualOwnerId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "status" "PaiementStatus" NOT NULL DEFAULT 'INACTIVE',
    "deadline" TIMESTAMP(3) NOT NULL,
    "initiateAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "AnnualOwnerPaiement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnualOwner" ADD CONSTRAINT "AnnualOwner_annualId_fkey" FOREIGN KEY ("annualId") REFERENCES "Annual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualOwner" ADD CONSTRAINT "AnnualOwner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualOwnerPaiement" ADD CONSTRAINT "AnnualOwnerPaiement_annualOwnerId_fkey" FOREIGN KEY ("annualOwnerId") REFERENCES "AnnualOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

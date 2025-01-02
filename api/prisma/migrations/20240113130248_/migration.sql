-- CreateEnum
CREATE TYPE "BasicRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- CreateEnum
CREATE TYPE "PaiementStatus" AS ENUM ('DEBT', 'UNPAID', 'PENDING', 'PAID', 'INACTIVE');

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "downloaded" INTEGER NOT NULL DEFAULT 0,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "fullname" TEXT NOT NULL,
    "password" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "BasicRole" NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "query" JSONB,
    "params" JSONB,
    "body" JSONB,
    "authorId" TEXT,

    CONSTRAINT "HttpLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Individual" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "label" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "unitAmount" DOUBLE PRECISION NOT NULL,
    "unitAmountWithFees" DOUBLE PRECISION NOT NULL,
    "totalAmountToGive" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "benefice" DOUBLE PRECISION NOT NULL,
    "periodSize" INTEGER NOT NULL,
    "currentlyPaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualPaiement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "individualId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "status" "PaiementStatus" NOT NULL DEFAULT 'INACTIVE',
    "initiateAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "IndividualPaiement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_username_key" ON "Auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_phone_key" ON "Auth"("phone");

-- AddForeignKey
ALTER TABLE "HttpLog" ADD CONSTRAINT "HttpLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Individual" ADD CONSTRAINT "Individual_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualPaiement" ADD CONSTRAINT "IndividualPaiement_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "Individual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

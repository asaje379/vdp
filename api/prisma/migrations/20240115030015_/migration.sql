/*
  Warnings:

  - Added the required column `tontine` to the `EndTontine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EndTontine" ADD COLUMN     "tontine" TEXT NOT NULL;

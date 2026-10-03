/*
  Warnings:

  - Added the required column `ExternalOrderId` to the `ExternalOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalClientId` to the `ExternalOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ExternalOrder" ADD COLUMN     "ExternalOrderId" INTEGER NOT NULL,
ADD COLUMN     "externalClientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ExternalOrder" ADD CONSTRAINT "ExternalOrder_externalClientId_fkey" FOREIGN KEY ("externalClientId") REFERENCES "public"."ExternalClients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

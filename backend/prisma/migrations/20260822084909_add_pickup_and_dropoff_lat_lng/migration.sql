/*
  Warnings:

  - Added the required column `dropoffLatitude` to the `ExternalOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffLongitude` to the `ExternalOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLatitude` to the `ExternalOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLongitude` to the `ExternalOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ExternalOrder" ADD COLUMN     "dropoffLatitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "dropoffLongitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "pickupLatitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "pickupLongitude" DECIMAL(65,30) NOT NULL;

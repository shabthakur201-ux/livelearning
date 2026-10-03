-- CreateEnum
CREATE TYPE "public"."ROLE" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."ExternalOrder" ALTER COLUMN "ExternalOrderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."ROLE" NOT NULL DEFAULT 'USER';

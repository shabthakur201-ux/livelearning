-- CreateTable
CREATE TABLE "public"."ExternalClients" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "allowedDomain" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalClients_pkey" PRIMARY KEY ("id")
);

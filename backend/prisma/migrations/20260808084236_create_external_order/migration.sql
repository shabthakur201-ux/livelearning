-- CreateTable
CREATE TABLE "public"."ExternalOrder" (
    "id" SERIAL NOT NULL,
    "pickup" TEXT NOT NULL,
    "dropoff" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalOrder_pkey" PRIMARY KEY ("id")
);

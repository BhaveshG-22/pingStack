-- CreateTable
CREATE TABLE "SMTPConfig" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "host" TEXT,
    "port" INTEGER,
    "secure" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SMTPConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SMTPConfig_email_userId_key" ON "SMTPConfig"("email", "userId");

-- AddForeignKey
ALTER TABLE "SMTPConfig" ADD CONSTRAINT "SMTPConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

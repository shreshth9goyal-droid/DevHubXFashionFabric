-- Run this SQL in Supabase SQL Editor
-- Go to: https://app.supabase.com > SQL Editor > New Query

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user' NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Catalogue table
CREATE TABLE IF NOT EXISTS "Catalogue" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    category TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "pageImages" TEXT[] DEFAULT '{}',
    color TEXT DEFAULT 'bg-neutral-100' NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL
);

-- Create Download table
CREATE TABLE IF NOT EXISTS "Download" (
    id TEXT PRIMARY KEY,
    "catalogueId" TEXT NOT NULL,
    "userName" TEXT,
    "userEmail" TEXT,
    "userPhone" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "downloadedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "Download_catalogueId_fkey" FOREIGN KEY ("catalogueId") 
        REFERENCES "Catalogue"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create FileUpload table
CREATE TABLE IF NOT EXISTS "FileUpload" (
    id TEXT PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedBy" TEXT,
    "catalogueId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create CatalogueSubmission table
CREATE TABLE IF NOT EXISTS "CatalogueSubmission" (
    id TEXT PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    email TEXT NOT NULL,
    "companyName" TEXT,
    "phoneNumber" TEXT NOT NULL,
    country TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "otpVerified" BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Download_catalogueId_idx" ON "Download"("catalogueId");
CREATE INDEX IF NOT EXISTS "Catalogue_published_idx" ON "Catalogue"(published);
CREATE INDEX IF NOT EXISTS "FileUpload_catalogueId_idx" ON "FileUpload"("catalogueId");
CREATE INDEX IF NOT EXISTS "CatalogueSubmission_email_idx" ON "CatalogueSubmission"(email);
CREATE INDEX IF NOT EXISTS "CatalogueSubmission_phoneNumber_idx" ON "CatalogueSubmission"("phoneNumber");
CREATE INDEX IF NOT EXISTS "CatalogueSubmission_createdAt_idx" ON "CatalogueSubmission"("createdAt");

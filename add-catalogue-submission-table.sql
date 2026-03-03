-- SQL Script to add CatalogueSubmission table
-- Run this in Supabase SQL Editor

-- Create CatalogueSubmission table
CREATE TABLE IF NOT EXISTS "CatalogueSubmission" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "CatalogueSubmission_email_idx" ON "CatalogueSubmission"(email);
CREATE INDEX IF NOT EXISTS "CatalogueSubmission_phoneNumber_idx" ON "CatalogueSubmission"("phoneNumber");
CREATE INDEX IF NOT EXISTS "CatalogueSubmission_createdAt_idx" ON "CatalogueSubmission"("createdAt");

-- Add a trigger to automatically update the updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_catalogue_submission_updated_at BEFORE UPDATE
    ON "CatalogueSubmission" FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the table was created
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_name = 'CatalogueSubmission'
ORDER BY 
    ordinal_position;

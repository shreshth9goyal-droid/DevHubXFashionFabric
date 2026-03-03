// Shared in-memory store for OTPs
// In production, this should be replaced with Redis or a database for persistence across server restarts/workers

export const otpStore = new Map<string, { otp: string; expiresAt: number }>();

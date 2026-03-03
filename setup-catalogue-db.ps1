# Catalogue Database Setup Script
# Run this script after making schema changes

Write-Host "🚀 Setting up Catalogue Submission Database..." -ForegroundColor Cyan

# Step 1: Push schema to database
Write-Host "`n📦 Step 1: Pushing schema changes to database..." -ForegroundColor Yellow
npm run prisma:push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Schema pushed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Error pushing schema. Please check your database connection." -ForegroundColor Red
    exit 1
}

# Step 2: Generate Prisma Client
Write-Host "`n🔧 Step 2: Generating Prisma Client..." -ForegroundColor Yellow
Write-Host "⚠️  Please stop your development server first if it's running" -ForegroundColor Yellow
Read-Host "Press Enter to continue"

npm run prisma:generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma Client generated successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️  If you see EPERM error, please:" -ForegroundColor Yellow
    Write-Host "   1. Stop your development server (Ctrl+C)" -ForegroundColor Yellow
    Write-Host "   2. Run: npx prisma generate" -ForegroundColor Yellow
    Write-Host "   3. Restart your development server" -ForegroundColor Yellow
}

# Step 3: Instructions
Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart your development server: npm run dev" -ForegroundColor White
Write-Host "2. Test the form at: http://localhost:3000/catalogue" -ForegroundColor White
Write-Host "3. View submissions at: http://localhost:3000/admin/catalogue-submissions" -ForegroundColor White
Write-Host "`n✨ Setup complete! Check CATALOGUE-DATABASE-SETUP.md for details." -ForegroundColor Green

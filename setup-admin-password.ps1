# Setup Admin with Strong Password
# This script helps you create a secure admin account

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Fashion Fabric - Admin Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file with your database credentials first." -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Strong Password Requirements:" -ForegroundColor Yellow
Write-Host "  • Minimum 12 characters" -ForegroundColor White
Write-Host "  • At least one uppercase letter (A-Z)" -ForegroundColor White
Write-Host "  • At least one lowercase letter (a-z)" -ForegroundColor White
Write-Host "  • At least one number (0-9)" -ForegroundColor White
Write-Host "  • At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)" -ForegroundColor White
Write-Host ""

# Function to validate password strength
function Test-PasswordStrength {
    param([string]$Password)
    
    $errors = @()
    
    if ($Password.Length -lt 12) {
        $errors += "Password must be at least 12 characters long"
    }
    if ($Password -cnotmatch "[A-Z]") {
        $errors += "Password must contain at least one uppercase letter"
    }
    if ($Password -cnotmatch "[a-z]") {
        $errors += "Password must contain at least one lowercase letter"
    }
    if ($Password -notmatch "\d") {
        $errors += "Password must contain at least one number"
    }
    if ($Password -notmatch "[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]") {
        $errors += "Password must contain at least one special character"
    }
    
    return $errors
}

# Ask if user wants to set custom password
Write-Host "Do you want to set a custom admin password? (Y/N)" -ForegroundColor Cyan
Write-Host "Press N to use default: FashionAdmin@2026!" -ForegroundColor Gray
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    do {
        Write-Host ""
        $password = Read-Host "Enter admin password" -AsSecureString
        $plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
            [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
        )
        
        $errors = Test-PasswordStrength -Password $plainPassword
        
        if ($errors.Count -eq 0) {
            Write-Host "✅ Password meets all requirements!" -ForegroundColor Green
            
            # Confirm password
            $confirmPassword = Read-Host "Confirm password" -AsSecureString
            $plainConfirm = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
                [Runtime.InteropServices.Marshal]::SecureStringToBSTR($confirmPassword)
            )
            
            if ($plainPassword -eq $plainConfirm) {
                Write-Host "✅ Passwords match!" -ForegroundColor Green
                $env:ADMIN_PASSWORD = $plainPassword
                break
            } else {
                Write-Host "❌ Passwords do not match. Please try again." -ForegroundColor Red
            }
        } else {
            Write-Host ""
            Write-Host "❌ Password does not meet requirements:" -ForegroundColor Red
            foreach ($error in $errors) {
                Write-Host "  • $error" -ForegroundColor Yellow
            }
            Write-Host ""
            Write-Host "Please try again." -ForegroundColor Yellow
        }
    } while ($true)
} else {
    Write-Host "Using default password: FashionAdmin@2026!" -ForegroundColor Yellow
    Write-Host "⚠️  Remember to change this after first login!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Running Database Seed..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Run the seed
npm run seed

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ Admin Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📧 Email: admin@fashionfabric.com" -ForegroundColor Cyan
    if ($env:ADMIN_PASSWORD) {
        Write-Host "🔑 Password: (your custom password)" -ForegroundColor Cyan
    } else {
        Write-Host "🔑 Password: FashionAdmin@2026!" -ForegroundColor Cyan
    }
    Write-Host ""
    Write-Host "🌐 Login at: http://localhost:3000/admin/login" -ForegroundColor Cyan
    Write-Host "🔒 Change password at: http://localhost:3000/admin/change-password" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Change your password after first login!" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Seed failed! Please check the error messages above." -ForegroundColor Red
    Write-Host "Make sure your database is running and credentials are correct." -ForegroundColor Yellow
}

Write-Host ""

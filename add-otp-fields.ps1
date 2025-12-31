$file = "src\lib\models\Order.js"
$content = Get-Content $file -Raw

# Find the active status field (around line 252-256, NOT the commented one)
# Insert OTP fields after the status closing brace
$pattern = "(\s+default: 'pending'\r\n\s+\},\r\n\s+\r\n\s+// 🔑 Field for the Delivery Role)"
$replacement = @"
    default: 'pending'
  },
  
  // 🔑 OTP Delivery Verification System
  deliveryOTP: { 
    type: String, 
    select: false
  },
  otpGeneratedAt: { type: Date },
  deliveryVerificationMethod: { 
    type: String, 
    enum: ['otp', 'qr', 'none'], 
    default: 'otp' 
  },
  otpVerified: { 
    type: Boolean, 
    default: false 
  },
  
  // 🔑 Field for the Delivery Role
"@

$newContent = $content -replace $pattern, $replacement

# Also fix the status enum
$newContent = $newContent -replace "'out-for-delivery'", "'out_for_delivery'"

Set-Content $file $newContent -NoNewline
Write-Host "✅ OTP fields added successfully!"

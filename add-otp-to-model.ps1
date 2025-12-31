$filePath = "src\lib\models\Order.js"
$content = Get-Content $filePath -Raw

# Add OTP fields after assignedTo field
$search = "  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Null until a delivery person is assigned
  },
  
  estimatedDeliveryTime:"

$replace = "  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Null until a delivery person is assigned
  },
  
  // 🔐 OTP Delivery Verification System
  deliveryOTP: { type: String, select: false },
  otpGeneratedAt: { type: Date, default: Date.now },
  otpVerified: { type: Boolean, default: false },
  
  estimatedDeliveryTime:"

if ($content -match [regex]::Escape($search)) {
    $newContent = $content -replace [regex]::Escape($search), $replace
    Set-Content $filePath $newContent -NoNewline
    Write-Host "✅ OTP fields added successfully!"
}
else {
    Write-Host "❌ Pattern not found. File may have been modified."
}

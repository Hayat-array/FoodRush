const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'models', 'Order.js');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Find line with "assignedTo" and insert OTP fields after its closing brace
let insertIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('assignedTo:') && lines[i].includes('{')) {
        // Find the closing brace for assignedTo
        for (let j = i; j < lines.length; j++) {
            if (lines[j].trim() === '},') {
                insertIndex = j + 1;
                break;
            }
        }
        break;
    }
}

if (insertIndex > 0) {
    // Check if OTP fields already exist
    const nextFewLines = lines.slice(insertIndex, insertIndex + 5).join('\n');
    if (nextFewLines.includes('deliveryOTP')) {
        console.log('✅ OTP fields already exist in the Order model!');
    } else {
        // Insert OTP fields
        const otpFields = [
            '  ',
            '  // 🔐 OTP Delivery Verification System',
            '  deliveryOTP: { type: String, select: false },',
            '  otpGeneratedAt: { type: Date, default: Date.now },',
            '  otpVerified: { type: Boolean, default: false },'
        ];

        lines.splice(insertIndex, 0, ...otpFields);
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log('✅ OTP fields added successfully to Order model!');
    }
} else {
    console.log('❌ Could not find assignedTo field in Order model');
}

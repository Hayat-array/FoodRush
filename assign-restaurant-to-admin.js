// Script to assign restaurant to admin user
// Run this in your MongoDB or via API

/*
STEP 1: Find your admin user ID and restaurant ID

In MongoDB Compass or shell:
db.users.findOne({ email: "your-admin-email@example.com" })
db.restaurants.findOne({})

STEP 2: Update user with restaurant ID

db.users.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { restaurant: ObjectId("YOUR_RESTAURANT_ID_HERE") } }
)

OR use this Node.js script:
*/

const mongoose = require('mongoose');

async function assignRestaurantToAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        const User = require('./src/lib/models/User').default;
        const Restaurant = require('./src/lib/models/Restaurant').default;

        // Find admin user (replace with your admin email)
        const adminEmail = "admin@example.com"; // CHANGE THIS
        const admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            console.log("Admin user not found!");
            return;
        }

        // Find first restaurant
        const restaurant = await Restaurant.findOne({});

        if (!restaurant) {
            console.log("No restaurant found!");
            return;
        }

        // Assign restaurant to admin
        admin.restaurant = restaurant._id;
        await admin.save();

        console.log(`✅ Success! Assigned restaurant "${restaurant.name}" to admin "${admin.email}"`);
        console.log(`Restaurant ID: ${restaurant._id}`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

// Run the function
assignRestaurantToAdmin();

/*
STEP 3: Access the new settings page

Navigate to: http://localhost:3000/admin/settings-new

You should see:
- Modern dashboard with color-coded cards
- Quick stats (Staff, Status, Coupons, Delivery)
- 14 settings sections with icons
- Quick action buttons

If you still see errors, check:
1. You're logged in as admin
2. Your user has restaurant field set
3. The page is at /admin/settings-new (not /admin/settings)
*/

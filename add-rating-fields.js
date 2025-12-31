import connectDB from './lib/db.js';
import { Dish } from './src/lib/models/index.js';

async function addRatingFields() {
    try {
        await connectDB();

        // Update all existing dishes to have the new rating fields
        const result = await Dish.updateMany(
            {},
            {
                $set: {
                    ratings: [],
                    totalRatings: 0,
                    orderCount: 0
                }
            }
        );

        console.log(`✅ Updated ${result.modifiedCount} dishes with rating fields`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

addRatingFields();

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodrush';

async function checkRatings() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const Dish = mongoose.model('Dish', new mongoose.Schema({}, { strict: false }));

        // Find all dishes
        const allDishes = await Dish.find({}).select('name rating totalRatings ratings').lean();

        console.log(`\n=== Total Dishes: ${allDishes.length} ===\n`);

        const dishesWithRatings = allDishes.filter(d => d.ratings && d.ratings.length > 0);

        console.log(`Dishes with ratings: ${dishesWithRatings.length}\n`);

        if (dishesWithRatings.length > 0) {
            dishesWithRatings.forEach(dish => {
                console.log(`\n📍 ${dish.name}`);
                console.log(`   Average: ${dish.rating || 0}`);
                console.log(`   Total: ${dish.totalRatings || 0}`);
                console.log(`   Reviews: ${dish.ratings.length}`);
                dish.ratings.forEach((r, i) => {
                    console.log(`   ${i + 1}. ⭐ ${r.rating} - "${r.comment || 'no comment'}"`);
                });
            });
        } else {
            console.log('❌ No ratings found in database');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkRatings();

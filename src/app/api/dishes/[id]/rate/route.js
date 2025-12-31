import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import { Dish, Order } from '@/lib/models';

export async function POST(request, { params }) {
    try {
        await connectDB();

        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const { rating, comment } = await request.json();

        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json({ success: false, error: 'Rating must be between 1 and 5' }, { status: 400 });
        }

        // Find the dish
        const dish = await Dish.findById(id);
        if (!dish) {
            return NextResponse.json({ success: false, error: 'Dish not found' }, { status: 404 });
        }

        // Initialize ratings array if it doesn't exist (for old dishes)
        if (!dish.ratings) {
            dish.ratings = [];
        }
        if (dish.totalRatings === undefined) {
            dish.totalRatings = 0;
        }

        // Check if user has ordered this dish (optional - can be enabled/disabled)
        const hasOrdered = await Order.findOne({
            'customer.email': session.user.email,
            'items.dish': id,
            status: { $in: ['delivered', 'completed'] }
        });

        if (!hasOrdered) {
            return NextResponse.json({
                success: false,
                error: 'You can only rate dishes you have ordered'
            }, { status: 403 });
        }

        // Check if user already rated this dish
        const existingRatingIndex = dish.ratings.findIndex(
            r => r.user.toString() === session.user.id
        );

        if (existingRatingIndex > -1) {
            // Update existing rating
            dish.ratings[existingRatingIndex].rating = rating;
            dish.ratings[existingRatingIndex].comment = comment || '';
            dish.ratings[existingRatingIndex].createdAt = new Date();
        } else {
            // Add new rating
            dish.ratings.push({
                user: session.user.id,
                rating: rating,
                comment: comment || '',
                createdAt: new Date()
            });
        }

        // Recalculate average rating
        const totalRatings = dish.ratings.length;
        const sumRatings = dish.ratings.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

        dish.rating = parseFloat(averageRating);
        dish.totalRatings = totalRatings;

        console.log('💾 Saving rating to database...');
        console.log('Dish ID:', id);
        console.log('Ratings array length:', dish.ratings.length);
        console.log('Average rating:', dish.rating);
        console.log('Total ratings:', dish.totalRatings);

        const savedDish = await dish.save();

        console.log('✅ Rating saved successfully!');
        console.log('Saved ratings count:', savedDish.ratings.length);

        return NextResponse.json({
            success: true,
            data: {
                rating: dish.rating,
                totalRatings: dish.totalRatings,
                userRating: rating
            }
        });

    } catch (error) {
        console.error('❌ Rating error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json({
            success: false,
            error: 'Failed to submit rating'
        }, { status: 500 });
    }
}

// GET - Get user's rating for a dish
export async function GET(request, { params }) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const dish = await Dish.findById(id);

        if (!dish) {
            return NextResponse.json({ success: false, error: 'Dish not found' }, { status: 404 });
        }

        const userRating = dish.ratings.find(r => r.user.toString() === session.user.id);

        return NextResponse.json({
            success: true,
            data: {
                userRating: userRating ? userRating.rating : null,
                averageRating: dish.rating,
                totalRatings: dish.totalRatings
            }
        });

    } catch (error) {
        console.error('Get rating error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to get rating'
        }, { status: 500 });
    }
}

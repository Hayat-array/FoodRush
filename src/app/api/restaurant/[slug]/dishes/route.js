import connectDB from '@/lib/mongodb';
import { Restaurant, Dish } from '@/lib/models';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { slug } = params;
    
    // First find the restaurant
    const restaurant = await Restaurant.findOne({ 
      slug, 
      isActive: true 
    });
    
    if (!restaurant) {
      return Response.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

    // Find dishes for this restaurant
    const dishes = await Dish.find({ 
      restaurant: restaurant._id,
      isAvailable: true 
    })
      .sort({ category: 1, isPopular: -1, rating: -1 })
      .lean();

    return Response.json({
      success: true,
      data: dishes
    });

  } catch (error) {
    console.error('Error fetching dishes:', error);
    return Response.json({
      success: false,
      error: 'Failed to fetch dishes'
    }, { status: 500 });
  }
}
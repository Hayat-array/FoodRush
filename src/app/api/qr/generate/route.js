import QRCode from 'qrcode';
import connectDB from '@/lib/db';
import { Restaurant } from '@/lib/models';

export async function POST(request) {
  try {
    await connectDB();
    
    const { restaurantId, size = 300 } = await request.json();
    
    // Find restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    
    if (!restaurant) {
      return Response.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

    // Generate QR code
    try {
      const restaurantUrl = `${process.env.NEXTAUTH_URL}/restaurant/${restaurant.slug}`;
      
      const qrCodeData = await QRCode.toDataURL(restaurantUrl, {
        width: size,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return Response.json({
        success: true,
        data: {
          qrCode: qrCodeData,
          restaurantUrl
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      return Response.json({
        success: false,
        error: 'Failed to generate QR code'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
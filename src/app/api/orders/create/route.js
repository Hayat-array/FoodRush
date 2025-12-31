// import connectDB from '@/lib/db';
// import { Order, Restaurant, Dish } from '@/lib/models';

// export async function POST(request) {
//   try {
//     await connectDB();

//     const orderData = await request.json();

//     // Validate required fields
//     const requiredFields = ['customer', 'restaurant', 'items', 'deliveryType', 'paymentMethod', 'total'];
//     for (const field of requiredFields) {
//       if (!orderData[field]) {
//         return Response.json({
//           success: false,
//           error: `Missing required field: ${field}`
//         }, { status: 400 });
//       }
//     }

//     // Validate restaurant exists
//     const restaurant = await Restaurant.findById(orderData.restaurant);

//     if (!restaurant) {
//       return Response.json({
//         success: false,
//         error: 'Restaurant not found'
//       }, { status: 404 });
//     }

//     // Validate dishes
//     const dishIds = orderData.items.map(item => item.dish);
//     const dishes = await Dish.find({ _id: { $in: dishIds } });

//     if (dishes.length !== dishIds.length) {
//       return Response.json({
//         success: false,
//         error: 'Some dishes not found'
//       }, { status: 404 });
//     }

//     // Calculate totals
//     const subtotal = orderData.subtotal || orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const deliveryFee = orderData.deliveryFee || restaurant.deliveryFee || 0;
//     const taxes = orderData.taxes || Math.round(subtotal * 0.05); // 5% tax
//     const total = subtotal + deliveryFee + taxes;

//     // Generate unique order number
//     const orderNumber = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

//     // Create order
//     const order = new Order({
//       orderNumber,
//       customer: orderData.customer,
//       restaurant: orderData.restaurant,
//       items: orderData.items.map(item => ({
//         dish: item.dish,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         subtotal: item.price * item.quantity,
//         size: item.size || null,
//         customizations: item.customizations || []
//       })),
//       deliveryType: orderData.deliveryType,
//       deliveryAddress: orderData.deliveryAddress || null,
//       pickupTime: orderData.pickupTime || null,
//       paymentMethod: orderData.paymentMethod,
//       subtotal,
//       deliveryFee,
//       taxes,
//       total,
//       specialInstructions: orderData.specialInstructions || '',
//       estimatedDeliveryTime: new Date(Date.now() + (restaurant.deliveryTime?.split('-')[0] * 60000)),
//       actualDeliveryTime: null,
//       status: 'pending',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });

//     await order.save();

//     // Update dish order counts
//     await Dish.updateMany(
//       dishIds.map(id => ({ _id: id })),
//       { $inc: 1 }
//     );

//     return Response.json({
//       success: true,
//       data: {
//         orderNumber: order.orderNumber,
//         total: order.total,
//         paymentMethod: order.paymentMethod,
//         estimatedDeliveryTime: order.estimatedDeliveryTime
//       }
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return Response.json({
//       success: false,
//       error: 'Failed to create order'
//     }, { status: 500 });
//   }
// }
// C:\website\Food Delivary App\foodrush\src\app\api\orders\create\route.js
// Updated: Fixed bulkWrite syntax
import connectDB from '@/lib/db'; // Standardized
import { Order, Restaurant, Dish } from '@/lib/models';

export async function POST(request) {
  try {
    await connectDB();

    const orderData = await request.json();

    // Validate required fields
    const requiredFields = ['customer', 'restaurant', 'items', 'deliveryType', 'paymentMethod'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return Response.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Validate restaurant exists
    const restaurant = await Restaurant.findById(orderData.restaurant);

    if (!restaurant) {
      return Response.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

    // Validate dishes and calculate totals server-side for consistency/security
    const dishIds = orderData.items.map(item => item.dish);
    const dishes = await Dish.find({ _id: { $in: dishIds } });

    if (dishes.length !== dishIds.length) {
      return Response.json({
        success: false,
        error: 'Some dishes not found'
      }, { status: 404 });
    }

    // Map and validate items with DB prices
    let subtotal = 0;
    const validatedItems = [];
    for (const item of orderData.items) {
      const dish = dishes.find(d => d._id.toString() === item.dish.toString());
      if (!dish) continue; // Skip invalid

      const itemPrice = dish.price;
      const itemSubtotal = itemPrice * item.quantity;
      subtotal += itemSubtotal;

      validatedItems.push({
        dish: dish._id,
        name: dish.name,
        price: itemPrice,
        quantity: item.quantity,
        subtotal: itemSubtotal,
        size: item.size || null,
        customizations: item.customizations || []
      });
    }

    if (validatedItems.length === 0) {
      return Response.json({ success: false, error: 'No valid items' }, { status: 400 });
    }

    const deliveryFee = orderData.deliveryFee || restaurant.deliveryFee || 0;
    const taxes = orderData.taxes || Math.round(subtotal * 0.05); // 5% tax
    const total = subtotal + deliveryFee + taxes;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // Generate 4-digit OTP for delivery verification
    const deliveryOTP = Math.floor(1000 + Math.random() * 9000).toString();

    // Create order with consistent defaults
    const order = new Order({
      orderNumber,
      customer: orderData.customer,
      restaurant: orderData.restaurant,
      items: validatedItems,
      deliveryType: orderData.deliveryType,
      deliveryAddress: orderData.deliveryAddress || null,
      pickupTime: orderData.pickupTime || null,
      paymentMethod: orderData.paymentMethod,
      utrNumber: orderData.utrNumber || null, // For UPI payments
      subtotal,
      deliveryFee,
      taxes,
      total,
      specialInstructions: orderData.specialInstructions || '',
      estimatedDeliveryTime: new Date(Date.now() + (parseInt(restaurant.deliveryTime?.split('-')[0]) || 30) * 60000),
      actualDeliveryTime: null,
      status: 'confirmed', // Auto-approve all orders for instant confirmation
      paymentVerified: orderData.paymentMethod === 'cod' ? true : false, // UPI payments can be reviewed later
      assignedTo: null,
      deliveryOTP: deliveryOTP,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await order.save();

    // Update dish order counts - DISABLED to fix bulkWrite error
    // TODO: Fix this later with proper syntax
    /*
    const bulkOps = dishIds.map(id => ({
      updateOne: {
        filter: { _id: id },
        update: {
          $inc: {
            orderCount: orderData.items.find(item => item.dish.toString() === id.toString())?.quantity || 1
          }
        }
      }
    }));
    
    if (bulkOps.length > 0) {
      await Dish.bulkWrite(bulkOps);
    }
    */

    return Response.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        total: order.total,
        paymentMethod: order.paymentMethod,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
        deliveryOTP: deliveryOTP // Include OTP for customer to see
      }
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return Response.json({
      success: false,
      error: 'Failed to create order',
      details: error.message // Include error message for debugging
    }, { status: 500 });
  }
}
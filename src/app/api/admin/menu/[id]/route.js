// // // import connectDB from '@/lib/mongodb';
// // // import { Dish, Restaurant } from '@/lib/models';

// // // export async function DELETE(request, { params }) {
// // //   try {
// // //     await connectDB();
    
// // //     const { id } = params;
    
// // //     // Find and delete dish
// // //     const dish = await Dish.findById(id);
    
// // //     if (!dish) {
// // //       return Response.json({
// // //         success: false,
// // //         error: 'Dish not found'
// // //       }, { status: 404 });
// // //     }

// // //     await Dish.findByIdAndDelete(id);

// // //     return Response.json({
// // //       success: true,
// // //       message: 'Dish deleted successfully'
// // //     });
// // //   } catch (error) {
// // //     console.error('Error deleting dish:', error);
// // //     return Response.json({
// // //       success: false,
// // //       error: 'Failed to delete dish'
// // //     }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import connectDB from '@/lib/mongodb';
// // import { Dish } from '@/lib/models';

// // export async function PUT(req, { params }) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();
    
// //     if (!session || !['admin', 'restaurant_owner'].includes(session.user.role)) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     const { id } = params;
// //     const body = await req.json();

// //     const updatedDish = await Dish.findByIdAndUpdate(
// //       id,
// //       { $set: body },
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedDish) {
// //       return NextResponse.json({ success: false, error: "Dish not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ success: true, data: updatedDish });

// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // export async function DELETE(req, { params }) {
// //   try {
// //     await connectDB();
// //     const session = await getServerSession();

// //     if (!session || !['admin', 'restaurant_owner'].includes(session.user.role)) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     const { id } = params;
// //     await Dish.findByIdAndDelete(id);

// //     return NextResponse.json({ success: true, message: "Dish deleted" });

// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Dish } from '@/lib/models';

// // DELETE A DISH
// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession();
    
//     // Await params (Next.js 15 requirement)
//     const { id } = await params;

//     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     await Dish.findByIdAndDelete(id);

//     return NextResponse.json({ success: true, message: "Dish deleted" });

//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// // UPDATE A DISH
// export async function PUT(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession();
//     const { id } = await params;

//     if (!session || !['admin', 'restaurant_owner'].includes(session.user?.role)) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     const updatedDish = await Dish.findByIdAndUpdate(
//       id,
//       { $set: body },
//       { new: true, runValidators: true }
//     );

//     return NextResponse.json({ success: true, data: updatedDish });

//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Dish, Restaurant, User } from '@/lib/models';

// DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession();
    
    // Await params for Next.js 15
    const { id } = await params;

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Security Check: Ensure this dish belongs to the user's restaurant
    const user = await User.findOne({ email: session.user.email });
    const restaurant = await Restaurant.findOne({ owner: user._id });
    
    if (!restaurant) {
      return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
    }

    // Perform Delete
    const deleted = await Dish.findOneAndDelete({ _id: id, restaurant: restaurant._id });

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Dish not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Dish deleted" });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// UPDATE (PUT)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession();
    const { id } = await params;

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Security Check
    const user = await User.findOne({ email: session.user.email });
    const restaurant = await Restaurant.findOne({ owner: user._id });

    if (!restaurant) {
      return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
    }

    const updatedDish = await Dish.findOneAndUpdate(
      { _id: id, restaurant: restaurant._id }, // Ensure ownership
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedDish) {
      return NextResponse.json({ success: false, error: "Dish not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedDish });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
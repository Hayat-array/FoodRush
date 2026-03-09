// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import connectDB from '@/lib/db';
// import { Restaurant, User } from '@/lib/models';

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession();

//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     // Find User
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
//     }

//     // Get restaurant ID from params
//     const { id } = params;
//     if (!id) {
//       return NextResponse.json({ success: false, error: "Restaurant ID is required" }, { status: 400 });
//     }

//     // Find restaurant by ID and check ownership
//     const restaurant = await Restaurant.findOne({ _id: id, owner: user._id });
//     if (!restaurant) {
//       return NextResponse.json({ success: false, error: "Restaurant not found or you don't have permission" }, { status: 404 });
//     }

//     // Get update data
//     const updateData = await req.json();

//     // Update restaurant
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     return NextResponse.json({ 
//       success: true, 
//       message: "Restaurant updated successfully",
//       data: updatedRestaurant 
//     });

//   } catch (error) {
//     console.error("Update error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       error: error.message || "Failed to update restaurant" 
//     }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import { Restaurant, User } from '@/lib/models';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PUT: Update an Existing Restaurant by ID from URL
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select('+role');
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ success: false, error: "Restaurant ID is required" }, { status: 400 });
        }

        // Security Check based on role
        let restaurant;

        if (user.role === 'super_admin') {
            // Super admin can update ANY restaurant
            restaurant = await Restaurant.findById(id);
        } else if (user.role === 'restaurant_owner') {
            // Restaurant owner can only update THEIR restaurant
            restaurant = await Restaurant.findOne({ _id: id, owner: user._id });
        } else {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        if (!restaurant) {
            return NextResponse.json({ success: false, error: "Restaurant not found or you don't have permission" }, { status: 404 });
        }

        // 3. Get update data from frontend
        const data = await req.json();

        // 4. Apply Robust Updates using $set
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    deliveryTime: data.deliveryTime,
                    deliveryFee: data.deliveryFee,
                    minOrder: data.minOrder,
                    isActive: data.isActive,
                    cuisine: data.cuisine,
                    image: data.image,
                    coverImage: data.coverImage,
                    upiId: data.upiId,
                    tags: data.tags,
                    workingHours: data.workingHours,
                    // Handle nested contact phone number explicitly
                    "contact.phone": data.phone,
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) {
            return NextResponse.json({ success: false, error: "Update failed." }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Restaurant updated successfully",
            data: updatedRestaurant
        });

    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to update restaurant"
        }, { status: 500 });
    }
}

// ----------------------------------------------------------------------
// DELETE: Delete a specific restaurant
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        const { id } = params;

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select('+role');

        // Security Check based on role
        let result;

        if (user.role === 'super_admin') {
            // Super admin can delete ANY restaurant
            result = await Restaurant.findByIdAndDelete(id);
        } else if (user.role === 'restaurant_owner') {
            // Restaurant owner can only delete THEIR restaurant
            result = await Restaurant.findOneAndDelete({
                _id: id,
                owner: user._id
            });
        } else {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        if (!result) {
            return NextResponse.json({ success: false, error: "Restaurant not found or unauthorized to delete." }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Restaurant deleted successfully" });

    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to delete restaurant" }, { status: 500 });
    }
}
'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import DeliveryNavbar from "@/components/DeliveryNavbar";

export default function ConditionalNavbar() {
    const pathname = usePathname();

    // Check if current route is a delivery route
    const isDeliveryRoute = pathname?.startsWith('/delivery');

    // Render appropriate navbar based on route
    return isDeliveryRoute ? <DeliveryNavbar /> : <Navbar />;
}

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotificationBell() {
    const { data: session } = useSession();
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            fetchNotifications();
            // Poll for new notifications every 30 seconds
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [session]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications?limit=10');
            const data = await res.json();
            if (data.success) {
                setNotifications(data.data);
                setUnreadCount(data.unreadCount);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await fetch(`/api/notifications/${notificationId}`, {
                method: 'PATCH',
            });
            fetchNotifications(); // Refresh notifications
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleNotificationClick = (notification) => {
        markAsRead(notification._id);
        if (notification.orderId) {
            router.push(`/orders/${notification.orderId}/track`);
        }
    };

    const getNotificationIcon = (type) => {
        // You can customize icons based on notification type
        return '🔔';
    };

    if (!session?.user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-2 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <p className="text-xs text-gray-500">{unreadCount} unread</p>
                    )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification._id}
                                className={`px-4 py-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className="flex gap-3 w-full">
                                    <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                    )}
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
                {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t text-center">
                        <button
                            className="text-sm text-orange-600 hover:underline"
                            onClick={() => router.push('/notifications')}
                        >
                            View all notifications
                        </button>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

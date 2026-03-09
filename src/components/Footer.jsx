import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">FR</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                FoodRush
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Order food from the best restaurants and shops with FoodRush.
                            We deliver your favorites fresh and fast.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
                            <li><Link href="/restaurant" className="hover:text-orange-400 transition-colors">Restaurants</Link></li>
                            <li><Link href="/menu" className="hover:text-orange-400 transition-colors">Menu</Link></li>
                            <li><Link href="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/cookies" className="hover:text-orange-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Partners & Admin */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">For Partners</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/auth/admin/signin" className="hover:text-orange-400 transition-colors flex items-center">
                                    Restaurant Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/admin/signin?type=super_admin" className="hover:text-orange-400 transition-colors flex items-center font-semibold text-orange-200">
                                    Super Admin Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/admin/signup" className="hover:text-orange-400 transition-colors">
                                    Add your Restaurant
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/delivery/signin" className="hover:text-green-400 transition-colors flex items-center">
                                    Delivery Partner Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/delivery/signup" className="hover:text-green-400 transition-colors">
                                    Sign up to Deliver
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} FoodRush. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }) {
    return (
        <Link href={href} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all">
            {icon}
        </Link>
    );
}

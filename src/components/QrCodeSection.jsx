'use client';

import { useState, useEffect } from 'react';
// 🔑 NOTE: You must have the 'qrcode' library installed: npm install qrcode
import QRCode from 'qrcode'; 
import { Download, Link as LinkIcon, QrCode as QrCodeIcon, Printer, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

/**
 * Reusable component to generate and display a QR code for a restaurant's public menu URL.
 * * @param {object} props
 * @param {string} props.restaurantSlug The unique slug of the restaurant (e.g., 'pizza-house-central').
 * @param {string} props.restaurantName The display name of the restaurant.
 * @returns {JSX.Element} Card containing the QR code preview and action buttons.
 */
export const QrCodeSection = ({ restaurantSlug, restaurantName = 'Restaurant' }) => {
    // Determine the base URL dynamically or set a default production base URL
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
    // 🔑 Construct the full URL for the menu based on the slug
    const menuUrl = restaurantSlug ? `${baseUrl}/restaurants/${restaurantSlug}` : `${baseUrl}/restaurants/menu-link-missing`;
    
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [qrLoading, setQrLoading] = useState(true);

    // Function to generate QR Code
    const generateQRCode = async (url) => {
        setQrLoading(true);
        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: 400,
                margin: 2,
                color: { dark: '#000000', light: '#ffffff' },
            });
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error("QR Code generation failed:", err);
            setQrDataUrl('');
        } finally {
            setQrLoading(false);
        }
    };

    // Regenerate QR code whenever the menuUrl changes
    useEffect(() => {
        if (restaurantSlug) {
            generateQRCode(menuUrl);
        } else {
            setQrDataUrl('');
            setQrLoading(false);
        }
    }, [menuUrl, restaurantSlug]);

    const handleDownload = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${restaurantName.replace(/\s/g, '-')}-menu-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        if (!qrDataUrl) return;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${restaurantName} QR Code</title>
                    <style>
                        body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; padding: 20px;}
                        img { max-width: 300px; height: auto; border: 5px solid #000; padding: 10px;}
                        h1 { margin-bottom: 10px; color: #f97316; }
                        p { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>Scan to View Menu</h1>
                    <img src="${qrDataUrl}" />
                    <p style="font-size: 14px; margin-top: 20px;">${menuUrl}</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <QrCodeIcon className="w-5 h-5 text-orange-500" /> Menu QR Code
                </CardTitle>
                <CardDescription>
                    Scan this code for direct access to the public menu page.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center border p-4 rounded-lg bg-gray-50">
                    {qrLoading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-orange-500 my-8" />
                    ) : qrDataUrl ? (
                        <div className="relative group">
                            <div className="border-4 border-black p-2 rounded-lg bg-white shadow-lg">
                                <img 
                                    src={qrDataUrl} 
                                    alt={`QR Code for ${restaurantName}`} 
                                    className="w-48 h-48 object-contain"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                                <LinkIcon className="w-3 h-3" /> 
                                {menuUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </p>
                        </div>
                    ) : (
                         <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No URL (Save settings first)</span>
                        </div>
                    )}
                </div>
                {qrDataUrl && (
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" /> Download PNG
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={handlePrint}>
                            <Printer className="w-4 h-4 mr-2" /> Print Sheet
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
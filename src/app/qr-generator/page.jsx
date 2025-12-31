// 'use client';

// import { useState } from 'react';
// import QRCode from 'qrcode';
// import { Download, Link as LinkIcon, QrCode, RefreshCw, Printer } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// export default function QrGeneratorPage() {
//   const [url, setUrl] = useState('https://foodrush.com/menu/table-1');
//   const [qrDataUrl, setQrDataUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Function to generate QR Code
//   const generateQRCode = async () => {
//     if (!url) {
//       setError('Please enter a valid URL');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       setError('');
      
//       // Generate QR as Data URL
//       const dataUrl = await QRCode.toDataURL(url, {
//         width: 400,
//         margin: 2,
//         color: {
//           dark: '#000000', // Black dots
//           light: '#ffffff', // White background
//         },
//       });
      
//       setQrDataUrl(dataUrl);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate QR code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate automatically on load
//   useState(() => {
//     generateQRCode();
//   }, []);

//   const handleDownload = () => {
//     if (!qrDataUrl) return;
    
//     const link = document.createElement('a');
//     link.href = qrDataUrl;
//     link.download = 'foodrush-qr.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handlePrint = () => {
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print QR Code</title>
//           <style>
//             body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
//             img { max-width: 300px; height: auto; }
//             h1 { margin-bottom: 10px; color: #f97316; }
//             p { color: #666; }
//           </style>
//         </head>
//         <body>
//           <h1>FoodRush</h1>
//           <img src="${qrDataUrl}" />
//           <p>Scan to view menu</p>
//           <p style="font-size: 12px; margin-top: 20px;">${url}</p>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
//             <QrCode className="w-8 h-8 text-orange-500" />
//             QR Code Generator
//           </h1>
//           <p className="mt-2 text-gray-600">
//             Create "Scan to Order" QR codes for restaurant tables or menus.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Configuration Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Configuration</CardTitle>
//               <CardDescription>Enter the destination link for your QR code.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="url">Destination URL</Label>
//                 <div className="relative">
//                   <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="url"
//                     placeholder="https://your-website.com/menu"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   This is the link users will be directed to when they scan the code.
//                 </p>
//               </div>

//               {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <Button 
//                 onClick={generateQRCode} 
//                 disabled={loading} 
//                 className="w-full bg-orange-500 hover:bg-orange-600"
//               >
//                 {loading ? (
//                   <>Generating...</>
//                 ) : (
//                   <>
//                     <RefreshCw className="w-4 h-4 mr-2" />
//                     Generate QR Code
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Preview Section */}
//           <Card className="flex flex-col justify-between">
//             <CardHeader>
//               <CardTitle>Preview</CardTitle>
//               <CardDescription>This is how your QR code will look.</CardDescription>
//             </CardHeader>
//             <CardContent className="flex flex-col items-center justify-center flex-1 py-6">
//               {qrDataUrl ? (
//                 <div className="relative group">
//                   <div className="border-4 border-black p-2 rounded-lg bg-white shadow-lg">
//                     <img 
//                       src={qrDataUrl} 
//                       alt="Generated QR Code" 
//                       className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
//                     />
//                   </div>
//                   <div className="mt-4 text-center">
//                     <p className="text-sm font-medium text-gray-900">Scan to test</p>
//                     <p className="text-xs text-gray-500 truncate max-w-[250px] mx-auto">{url}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <span className="text-gray-400 text-sm">Enter URL to generate</span>
//                 </div>
//               )}
//             </CardContent>
            
//             {/* Actions Footer */}
//             {qrDataUrl && (
//               <div className="p-6 pt-0 flex gap-3">
//                 <Button variant="outline" className="flex-1" onClick={handleDownload}>
//                   <Download className="w-4 h-4 mr-2" />
//                   Download
//                 </Button>
//                 <Button variant="outline" className="flex-1" onClick={handlePrint}>
//                   <Printer className="w-4 h-4 mr-2" />
//                   Print
//                 </Button>
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

// 1. Added useEffect to the imports here
import { useState, useEffect } from 'react'; 
import QRCode from 'qrcode';
import { Download, Link as LinkIcon, QrCode, RefreshCw, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function QrGeneratorPage() {
  const [url, setUrl] = useState('https://foodrush.com/menu/table-1');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to generate QR Code
  const generateQRCode = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Generate QR as Data URL
      const dataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000', // Black dots
          light: '#ffffff', // White background
        },
      });
      
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fixed logic: Using useEffect instead of useState for side effects
  useEffect(() => {
    generateQRCode();
  }, []);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'foodrush-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
            img { max-width: 300px; height: auto; }
            h1 { margin-bottom: 10px; color: #f97316; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <h1>FoodRush</h1>
          <img src="${qrDataUrl}" />
          <p>Scan to view menu</p>
          <p style="font-size: 12px; margin-top: 20px;">${url}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <QrCode className="w-8 h-8 text-orange-500" />
            QR Code Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Create "Scan to Order" QR codes for restaurant tables or menus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Configuration Section */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Enter the destination link for your QR code.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url">Destination URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="url"
                    placeholder="https://your-website.com/menu"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  This is the link users will be directed to when they scan the code.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={generateQRCode} 
                disabled={loading} 
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {loading ? (
                  <>Generating...</>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your QR code will look.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center flex-1 py-6">
              {qrDataUrl ? (
                <div className="relative group">
                  <div className="border-4 border-black p-2 rounded-lg bg-white shadow-lg">
                    <img 
                      src={qrDataUrl} 
                      alt="Generated QR Code" 
                      className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-gray-900">Scan to test</p>
                    <p className="text-xs text-gray-500 truncate max-w-[250px] mx-auto">{url}</p>
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-sm">Enter URL to generate</span>
                </div>
              )}
            </CardContent>
            
            {/* Actions Footer */}
            {qrDataUrl && (
              <div className="p-6 pt-0 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
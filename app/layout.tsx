  {/* This is called a root layout and is required. Any UI you add to the root layout will be shared across all pages in your application.*/} 

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body>{children}</body> */} 
			{/* By adding Inter to the <body> element, the font will be applied throughout your application. Here, you're also adding the Tailwind antialiased class which smooths out the font.  */}
			<body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

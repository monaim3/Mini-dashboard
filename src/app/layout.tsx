// import Providers from './providers';
// import { Toaster } from "@/components/ui/sonner";
// import './globals.css';

// export default function RootLayout({ children } : { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           {children}
//            <Toaster  position="top-right" richColors />
//         </Providers>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mini Dashboard',
  description: 'Product and Order Management Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
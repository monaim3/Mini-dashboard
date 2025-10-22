import Providers from './providers';
import { Toaster } from "@/components/ui/sonner";
import './globals.css';

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
           <Toaster />
        </Providers>
      </body>
    </html>
  );
}
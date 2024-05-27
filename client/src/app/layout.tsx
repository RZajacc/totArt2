import MyNav from '../_components/ui/MyNav';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Totart',
  description: 'Cool Berlin locations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <MyNav />
        <main>{children}</main>
      </body>
    </html>
  );
}

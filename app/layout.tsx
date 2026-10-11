import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Luxury Home Developer | Architectural Living',
  description: 'Premium showcase platform for luxury residential property developments and qualified enquiries.',
  openGraph: {
    title: 'Luxury Home Developer | Architectural Living',
    description: 'Premium showcase platform for luxury residential property developments and qualified enquiries.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Home Developer | Architectural Living',
    description: 'Premium showcase platform for luxury residential property developments and qualified enquiries.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

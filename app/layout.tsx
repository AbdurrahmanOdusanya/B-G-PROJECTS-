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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

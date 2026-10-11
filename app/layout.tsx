import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'B & G Projects | Architectural Living',
  description: 'Design-led residential developer crafting private sanctuaries, architectural compounds, and bespoke urban estates.',
  icons: {
    icon: [
      { url: '/assets/logo-light.png', type: 'image/png' },
    ],
    shortcut: '/assets/logo-light.png',
    apple: '/assets/logo-light.png',
  },
  openGraph: {
    title: 'B & G Projects | Architectural Living',
    description: 'Design-led residential developer crafting private sanctuaries, architectural compounds, and bespoke urban estates.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B & G Projects | Architectural Living',
    description: 'Design-led residential developer crafting private sanctuaries, architectural compounds, and bespoke urban estates.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo-light.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/logo-light.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/logo-light.png" />
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

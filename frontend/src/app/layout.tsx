import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'AutoReply AI',
  description: 'AI-powered WhatsApp replies for businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-blue-500/30">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

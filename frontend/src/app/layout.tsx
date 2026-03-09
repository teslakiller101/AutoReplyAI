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
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="text-xl font-bold text-blue-600">AutoReply AI</a>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/login" className="text-gray-700 hover:text-blue-600">Login</a>
                  <a href="/signup" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Sign Up</a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

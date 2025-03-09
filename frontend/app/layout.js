import { AuthProvider } from '@/context/AuthContext';
import { TeamProvider } from '@/context/TeamContext';
import Header from '@/components/common/Header';
import './globals.css';

export const metadata = {
  title: 'Spirit11 - Fantasy Cricket League',
  description: 'Build your dream cricket team and compete with others!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" style={{ backgroundColor: '#020611' }}>
      <body className="text-light min-h-screen flex flex-col" style={{ backgroundColor: '#020611' }}>
        <AuthProvider>
          <TeamProvider>
            <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#020611' }}>
              <Header />
              
              {/* Main content with proper padding for header */}
              <main className="flex-grow pt-header px-4 sm:px-6 lg:px-8 w-full" style={{ backgroundColor: '#020611' }}>
                {children}
              </main>
              
              {/* Footer that stays at bottom */}
              <footer 
                className="fixed bottom-0 left-0 w-full border-t border-dark-lightest py-4 px-6 text-center text-light-darkest" 
                style={{ backgroundColor: '#020611' }}
              >
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                  <p className="mb-2 sm:mb-0">&copy; 2025 Spirit11 Fantasy Cricket League</p>

                  {/* Optional footer links */}
                  <div className="flex space-x-4 text-sm">
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                  </div>
                </div>

                {/* Cricket decoration for footer */}
                <div className="mt-2 flex justify-center">
                  <div className="h-1 w-10 bg-accent/30 rounded-full mx-1"></div>
                  <div className="h-1 w-10 bg-primary/30 rounded-full mx-1"></div>
                  <div className="h-1 w-10 bg-secondary/30 rounded-full mx-1"></div>
                </div>
              </footer>

            </div>
          </TeamProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

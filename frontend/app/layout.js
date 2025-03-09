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
    <html lang="en" className="h-full">
      <body className="bg-dark text-light min-h-screen flex flex-col">
        <AuthProvider>
          <TeamProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              
              {/* Main content with proper padding for header */}
              <main className="flex-grow pt-header px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {children}
              </main>
              
              {/* Footer that stays at bottom */}
              <footer className="mt-auto bg-dark-lighter border-t border-dark-lightest py-4 px-6 text-center text-light-darkest">
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
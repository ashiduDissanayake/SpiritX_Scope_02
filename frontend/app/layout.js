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
    <html lang="en">
      <body>
        <AuthProvider>
          <TeamProvider>
            <div className="app-container">
              <Header />
              <main className="main-content">
                {children}
              </main>
              <footer className="footer">
                <p>&copy; 2025 Spirit11 Fantasy Cricket League</p>
              </footer>
            </div>
          </TeamProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
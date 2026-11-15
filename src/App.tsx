import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import './i18n';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PaintingsPage from './pages/PaintingsPage';
import AuctionsPage from './pages/AuctionsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CurrencyProvider>
          <Router>
            <div className="min-h-screen bg-base-100 text-base-content">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/paintings" element={<PaintingsPage />} />
                  <Route path="/paintings/:id" element={<PaintingsPage />} />
                  <Route path="/auctions" element={<AuctionsPage />} />
                  <Route path="/auctions/:id" element={<AuctionsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </Router>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/paintings', label: t('nav.paintings') },
    { path: '/auctions', label: t('nav.auctions') },
  ];

  return (
    <>
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            🎨 <span className="ml-2">Artistry</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              {i18n.language.toUpperCase()}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
              <li><button onClick={() => changeLanguage('en')}>English</button></li>
              <li><button onClick={() => changeLanguage('pl')}>Polski</button></li>
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              💰 {currency}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
              {availableCurrencies.map((curr) => (
                <li key={curr}>
                  <button onClick={() => setCurrency(curr)}>{curr}</button>
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
            {theme === 'pastel' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <>
              <Link to="/cart" className="btn btn-ghost btn-circle">
                🛒
              </Link>
              {isAdmin && (
                <Link to="/admin" className="btn btn-ghost btn-sm">
                  {t('nav.admin')}
                </Link>
              )}
              <Link to="/profile" className="btn btn-ghost btn-sm">
                {t('nav.profile')}
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              {t('nav.login')}
            </Link>
          )}
        </div>
      </nav>
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div className="flex gap-4">
          <Link to="/terms" className="link link-hover">{t('legal.terms')}</Link>
          <Link to="/privacy" className="link link-hover">{t('legal.privacy')}</Link>
        </div>
      </footer>
    </>
  );
};

export default Navbar;

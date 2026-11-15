import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-5xl font-bold mb-2">Artistry</h1>
          <h2 className="text-2xl font-semibold mb-4 text-primary">Gallery</h2>
          <p className="py-6 text-lg">{t('home.subtitle')}</p>
          <div className="flex gap-4 justify-center">
            <Link to="/paintings" className="btn btn-primary">
              {t('nav.paintings')}
            </Link>
            <Link to="/auctions" className="btn btn-secondary">
              {t('nav.auctions')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto prose">
      <h1 className="text-3xl font-bold mb-6">{t('legal.terms')}</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-bold">1. Introduction</h2>
          <p>
            Welcome to Art Gallery. By using our website and services, you agree to comply with 
            and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-xl font-bold mt-4">2. Paintings and Auctions</h2>
          <p>
            All paintings are original artworks. Auctions last for one hour from the start time. 
            The highest bidder at the end of the auction period wins the right to purchase the painting.
          </p>
          <p>
            Winning bidders have 24 hours to complete payment through Stripe. If payment is not 
            completed within this period, the painting may be relisted.
          </p>

          <h2 className="text-xl font-bold mt-4">3. Purchases</h2>
          <p>
            All purchases are final. Paintings are sold as-is without warranties. Buyers are 
            responsible for personal collection of purchased paintings from the artist's location.
          </p>
          <p>
            Shipping is not available. Collection arrangements must be made directly with the artist 
            after payment confirmation.
          </p>

          <h2 className="text-xl font-bold mt-4">4. Payment</h2>
          <p>
            Payments are processed through Stripe. We accept card payments, BLIK, and Przelewy24. 
            All transactions are secure and encrypted.
          </p>
          <p>
            Prices are displayed in Polish Złoty (PLN). Currency conversions shown are estimates 
            based on National Bank of Poland exchange rates and are for informational purposes only.
          </p>

          <h2 className="text-xl font-bold mt-4">5. User Accounts</h2>
          <p>
            Users must authenticate via Google OAuth. You are responsible for maintaining the 
            confidentiality of your account and for all activities that occur under your account.
          </p>

          <h2 className="text-xl font-bold mt-4">6. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy for information 
            about how we collect, use, and protect your personal data.
          </p>

          <h2 className="text-xl font-bold mt-4">7. Contact</h2>
          <p>
            For any questions about these terms, please contact us through the contact information 
            available in your profile after authentication.
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Last updated: November 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

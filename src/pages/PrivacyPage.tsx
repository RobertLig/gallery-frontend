import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto prose">
      <h1 className="text-3xl font-bold mb-6">{t('legal.privacy')}</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-bold">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Google account information (email, name) when you authenticate</li>
            <li>Profile information you choose to provide (phone number)</li>
            <li>Order and purchase history</li>
            <li>Bidding activity in auctions</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send you related information</li>
            <li>Send you notifications about auctions and orders</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with:
          </p>
          <ul>
            <li>Service providers who perform services on our behalf (e.g., Stripe for payments)</li>
            <li>Google for authentication purposes</li>
            <li>When required by law or to protect our rights</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your 
            personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-bold mt-4">5. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of certain communications</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">6. Cookies</h2>
          <p>
            We use cookies and similar technologies to improve your experience, analyze usage, 
            and assist in our marketing efforts. You can control cookie settings through your browser.
          </p>

          <h2 className="text-xl font-bold mt-4">7. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through the 
            contact information available in your profile.
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Last updated: November 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

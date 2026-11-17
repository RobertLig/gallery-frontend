import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto prose">
      <h1 className="text-3xl font-bold mb-6">{t('legal.terms')}</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-bold">1. {t('legal.termsSection1')}</h2>
          <p>
            {t('legal.termsIntro')}
          </p>

          <h2 className="text-xl font-bold mt-4">2. {t('legal.termsSection2')}</h2>
          <p>
            {t('legal.termsSection2Text1')}
          </p>
          <p>
            {t('legal.termsSection2Text2')}
          </p>

          <h2 className="text-xl font-bold mt-4">3. {t('legal.termsSection3')}</h2>
          <p>
            {t('legal.termsSection3Text1')}
          </p>
          <p>
            {t('legal.termsSection3Text2')}
          </p>

          <h2 className="text-xl font-bold mt-4">4. {t('legal.termsSection4')}</h2>
          <p>
            {t('legal.termsSection4Text1')}
          </p>
          <p>
            {t('legal.termsSection4Text2')}
          </p>

          <h2 className="text-xl font-bold mt-4">5. {t('legal.termsSection5')}</h2>
          <p>
            {t('legal.termsSection5Text')}
          </p>

          <h2 className="text-xl font-bold mt-4">6. {t('legal.termsSection6')}</h2>
          <p>
            {t('legal.termsSection6Text')}
          </p>

          <h2 className="text-xl font-bold mt-4">7. {t('legal.termsSection7')}</h2>
          <p>
            {t('legal.termsSection7Text')}
          </p>

          <p className="mt-4 text-sm text-gray-600">
            {t('legal.lastUpdated')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

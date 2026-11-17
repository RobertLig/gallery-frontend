import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto prose">
      <h1 className="text-3xl font-bold mb-6">{t('legal.privacy')}</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-bold">1. {t('legal.privacySection1')}</h2>
          <p>
            {t('legal.privacySection1Intro')}
          </p>
          <ul>
            <li>{t('legal.privacySection1Item1')}</li>
            <li>{t('legal.privacySection1Item2')}</li>
            <li>{t('legal.privacySection1Item3')}</li>
            <li>{t('legal.privacySection1Item4')}</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">2. {t('legal.privacySection2')}</h2>
          <p>
            {t('legal.privacySection2Intro')}
          </p>
          <ul>
            <li>{t('legal.privacySection2Item1')}</li>
            <li>{t('legal.privacySection2Item2')}</li>
            <li>{t('legal.privacySection2Item3')}</li>
            <li>{t('legal.privacySection2Item4')}</li>
            <li>{t('legal.privacySection2Item5')}</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">3. {t('legal.privacySection3')}</h2>
          <p>
            {t('legal.privacySection3Text')}
          </p>
          <ul>
            <li>{t('legal.privacySection3Item1')}</li>
            <li>{t('legal.privacySection3Item2')}</li>
            <li>{t('legal.privacySection3Item3')}</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">4. {t('legal.privacySection4')}</h2>
          <p>
            {t('legal.privacySection4Text')}
          </p>

          <h2 className="text-xl font-bold mt-4">5. {t('legal.privacySection5')}</h2>
          <p>
            {t('legal.privacySection5Intro')}
          </p>
          <ul>
            <li>{t('legal.privacySection5Item1')}</li>
            <li>{t('legal.privacySection5Item2')}</li>
            <li>{t('legal.privacySection5Item3')}</li>
            <li>{t('legal.privacySection5Item4')}</li>
          </ul>

          <h2 className="text-xl font-bold mt-4">6. {t('legal.privacySection6')}</h2>
          <p>
            {t('legal.privacySection6Text')}
          </p>

          <h2 className="text-xl font-bold mt-4">7. {t('legal.privacySection7')}</h2>
          <p>
            {t('legal.privacySection7Text')}
          </p>

          <p className="mt-4 text-sm text-gray-600">
            {t('legal.lastUpdated')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

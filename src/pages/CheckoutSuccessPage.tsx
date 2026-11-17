import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'failed'>('loading');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/');
      return;
    }
    checkOrderStatus(sessionId);
  }, [searchParams, navigate]);

  const checkOrderStatus = async (_sessionId: string) => {
    try {
      // In a real implementation, you'd poll the order status
      // For now, we'll assume success
      setStatus('success');
    } catch (error) {
      setStatus('failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          {status === 'loading' && (
            <>
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4">{t('common.loading')}</p>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold">{t('checkout.success')}</h2>
              <p className="mt-4">{t('checkout.thankYou')}</p>
              <button onClick={() => navigate('/profile')} className="btn btn-primary mt-4">
                {t('checkout.viewOrders')}
              </button>
            </>
          )}
          {status === 'pending' && (
            <>
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold">{t('checkout.pending')}</h2>
              <p className="mt-4">{t('checkout.paymentProcessing')}</p>
            </>
          )}
          {status === 'failed' && (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold">{t('checkout.failed')}</h2>
              <p className="mt-4">{t('checkout.tryAgain')}</p>
              <button onClick={() => navigate('/cart')} className="btn btn-primary mt-4">
                {t('checkout.returnToCart')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;

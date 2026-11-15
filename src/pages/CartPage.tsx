import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import api from '../lib/api';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  paintingId: string;
  title: string;
  priceMinor: number;
  currency: string;
  purchasable: boolean;
  photoUrl?: string;
}

interface CartResponse {
  items: CartItem[];
  totalMinor: number;
  currency: string;
}

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await api.get<CartResponse>('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (paintingId: string) => {
    try {
      await api.delete(`/cart/items/${paintingId}`);
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post<{ checkoutUrl: string }>('/checkout/cart');
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">{t('cart.title')}</h1>
        <p className="text-lg">{t('cart.empty')}</p>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('cart.title')}</h1>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.paintingId} className="card bg-base-100 shadow-xl">
            <div className="card-body flex flex-row items-center gap-4">
              {item.photoUrl && (
                <img src={item.photoUrl} alt={item.title} className="w-32 h-32 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="card-title">{item.title}</h3>
                <p className="text-lg font-semibold">
                  {formatPrice(item.priceMinor, item.currency)}
                </p>
                {!item.purchasable && (
                  <span className="badge badge-error">{t('cart.unavailable')}</span>
                )}
              </div>
              <button
                onClick={() => removeItem(item.paintingId)}
                className="btn btn-error btn-sm"
              >
                {t('cart.remove')}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">{t('cart.total')}</span>
            <span className="text-2xl font-bold">
              {formatPrice(cart.totalMinor, cart.currency)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="btn btn-primary w-full mt-4"
            disabled={!cart.items.some((i) => i.purchasable)}
          >
            {t('cart.checkout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

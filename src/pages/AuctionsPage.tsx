import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import api from '../lib/api';
import { useTranslation } from 'react-i18next';

interface Auction {
  id: string;
  paintingId: string;
  paintingTitle: string;
  paintingPhotoUrl?: string;
  startPriceMinor: number;
  currentBidMinor: number;
  currency: string;
  endsAt: string;
  status: string;
}

interface AuctionResponse {
  id: string;
  paintingId: string;
  paintingTitle: string;
  paintingPhotoUrl?: string;
  startPriceMinor: number;
  currentBidMinor: number;
  currency: string;
  endsAt: string;
  status: string;
  bids: { amountMinor: number; createdAt: string }[];
}

const AuctionsPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<AuctionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [placingBid, setPlacingBid] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuction(id);
    } else {
      fetchAuctions();
    }
  }, [id]);

  const fetchAuctions = async () => {
    try {
      const response = await api.get<{ items: Auction[] }>('/auctions');
      setAuctions(response.data.items);
    } catch (error) {
      console.error('Failed to fetch auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuction = async (auctionId: string) => {
    try {
      const response = await api.get<AuctionResponse>(`/auctions/${auctionId}`);
      setSelectedAuction(response.data);
    } catch (error) {
      console.error('Failed to fetch auction:', error);
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedAuction) return;

    const bidMinor = Math.round(parseFloat(bidAmount) * 100);
    if (bidMinor <= selectedAuction.currentBidMinor) {
      alert(t('auctions.bidTooLow'));
      return;
    }

    setPlacingBid(true);
    try {
      await api.post(`/auctions/${selectedAuction.id}/bids`, { bidMinor });
      setBidAmount('');
      fetchAuction(selectedAuction.id);
    } catch (error) {
      console.error('Failed to place bid:', error);
      alert(t('auctions.placeBidFailed'));
    } finally {
      setPlacingBid(false);
    }
  };


  const getTimeRemaining = (endsAt: string) => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return t('auctions.auctionEnded');
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (id && selectedAuction) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link to="/auctions" className="btn btn-ghost mb-4">
          ← {t('common.back')}
        </Link>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {selectedAuction.paintingPhotoUrl && (
              <img
                src={selectedAuction.paintingPhotoUrl}
                alt={selectedAuction.paintingTitle}
                className="w-full h-96 object-cover rounded"
              />
            )}
            <h1 className="text-3xl font-bold">{selectedAuction.paintingTitle}</h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="stat bg-base-200 rounded">
                <div className="stat-title">{t('auctions.currentBid')}</div>
                <div className="stat-value text-2xl">
                  {formatPrice(selectedAuction.currentBidMinor, selectedAuction.currency)}
                </div>
              </div>
              <div className="stat bg-base-200 rounded">
                <div className="stat-title">{t('auctions.endsIn')}</div>
                <div className="stat-value text-2xl">{getTimeRemaining(selectedAuction.endsAt)}</div>
              </div>
            </div>
            {user && selectedAuction.status === 'ACTIVE' && (
              <form onSubmit={placeBid} className="mt-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{t('auctions.yourBid')}</span>
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    step="0.01"
                    min={(selectedAuction.currentBidMinor / 100) + 0.01}
                    className="input input-bordered w-full"
                    placeholder={formatPrice(selectedAuction.currentBidMinor / 100 + 0.01, selectedAuction.currency)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4" disabled={placingBid}>
                  {placingBid ? <span className="loading loading-spinner"></span> : t('auctions.placeBid')}
                </button>
              </form>
            )}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">{t('auctions.bidHistory')}</h3>
              <ul className="space-y-2">
                {selectedAuction.bids.map((bid, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{t('auctions.bidNumber')} #{index + 1}</span>
                    <span className="font-semibold">{formatPrice(bid.amountMinor, selectedAuction.currency)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t('auctions.title')}</h1>
      {auctions.length === 0 ? (
        <p className="text-lg">{t('auctions.noAuctions')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <Link key={auction.id} to={`/auctions/${auction.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                {auction.paintingPhotoUrl && (
                  <img
                    src={auction.paintingPhotoUrl}
                    alt={auction.paintingTitle}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h2 className="card-title">{auction.paintingTitle}</h2>
                <p className="text-lg font-semibold">
                  {t('auctions.currentBid')}: {formatPrice(auction.currentBidMinor, auction.currency)}
                </p>
                <p className="text-sm">{t('auctions.endsIn')}: {getTimeRemaining(auction.endsAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionsPage;

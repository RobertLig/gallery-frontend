import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../lib/api';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../contexts/CurrencyContext';

interface Painting {
  id: string;
  title: string;
  description: string;
  medium: string;
  year: number;
  priceMinor: number;
  currency: string;
  status: string;
  photos: { url: string; order: number }[];
}

interface PaintingsResponse {
  items: Painting[];
  total: number;
  page: number;
  size: number;
}

const PaintingsPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (id) {
      fetchPainting(id);
    } else {
      fetchPaintings();
    }
  }, [id, page]);

  const fetchPaintings = async () => {
    try {
      const response = await api.get<PaintingsResponse>('/paintings', {
        params: { page, size: 12 },
      });
      setPaintings(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to fetch paintings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPainting = async (paintingId: string) => {
    try {
      const response = await api.get<Painting>(`/paintings/${paintingId}`);
      setSelectedPainting(response.data);
    } catch (error) {
      console.error('Failed to fetch painting:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (id && selectedPainting) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link to="/paintings" className="btn btn-ghost mb-4">
          ← {t('common.back')}
        </Link>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {selectedPainting.photos.length > 0 && (
              <img
                src={selectedPainting.photos[0].url}
                alt={selectedPainting.title}
                className="w-full h-96 object-cover rounded"
              />
            )}
            <h1 className="text-3xl font-bold">{selectedPainting.title}</h1>
            <p className="text-lg">{selectedPainting.description}</p>
            <div className="flex gap-4 mt-4">
              <span className="badge badge-lg">{selectedPainting.medium}</span>
              <span className="badge badge-lg">{selectedPainting.year}</span>
              <span className="badge badge-lg">{selectedPainting.status}</span>
            </div>
            <p className="text-2xl font-bold mt-4">
              {formatPrice(selectedPainting.priceMinor, selectedPainting.currency)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t('paintings.title')}</h1>
      {paintings.length === 0 ? (
        <p className="text-lg">{t('paintings.noResults')}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((painting) => (
              <Link key={painting.id} to={`/paintings/${painting.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  {painting.photos.length > 0 && (
                    <img
                      src={painting.photos[0].url}
                      alt={painting.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                  <h2 className="card-title">{painting.title}</h2>
                  <p className="text-sm text-gray-600">{painting.medium}, {painting.year}</p>
                  <p className="text-lg font-semibold">
                    {formatPrice(painting.priceMinor, painting.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <button
              className="btn btn-secondary"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              {t('common.back')}
            </button>
            <span className="btn btn-ghost">
              {page + 1}
            </span>
            <button
              className="btn btn-secondary"
              disabled={(page + 1) * 12 >= total}
              onClick={() => setPage((p) => p + 1)}
            >
              {t('common.next')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaintingsPage;

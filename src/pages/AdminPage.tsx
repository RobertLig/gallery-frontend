import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PhotoUpload from '../components/PhotoUpload';
import api from '../lib/api';

interface Photo {
  id: string;
  url: string;
  file?: File;
}

const AdminPage: React.FC = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'create' | 'orders'>('create');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [medium, setMedium] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [price, setPrice] = useState('');
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const handleCreatePainting = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Create painting
      const paintingResponse = await api.post('/admin/paintings', {
        title,
        description,
        medium,
        year,
        priceMinor: Math.round(parseFloat(price) * 100),
      });

      const paintingId = paintingResponse.data.id;

      // Upload photos
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        if (photo.file) {
          // Request upload intent
          const uploadIntent = await api.post(`/admin/paintings/${paintingId}/photos/upload-intent`, {
            fileName: photo.file.name,
            contentType: photo.file.type,
          });

          // Upload to S3
          await fetch(uploadIntent.data.uploadUrl, {
            method: 'PUT',
            body: photo.file,
            headers: {
              'Content-Type': photo.file.type,
            },
          });

          // Complete upload
          await api.post(`/admin/paintings/${paintingId}/photos/${uploadIntent.data.photoId}/complete`, {
            order: i,
          });
        }
      }

      // Reset form
      setTitle('');
      setDescription('');
      setMedium('');
      setYear(new Date().getFullYear());
      setPrice('');
      setPhotos([]);

      alert(t('admin.paintingCreated'));
    } catch (error) {
      console.error('Failed to create painting:', error);
      alert(t('admin.paintingCreateFailed'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('admin.title')}</h1>
      
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          {t('admin.createPainting')}
        </button>
        <button
          className={`tab ${activeTab === 'orders' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          {t('admin.manageOrders')}
        </button>
      </div>

      {activeTab === 'create' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleCreatePainting} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t('admin.title')}</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t('admin.description')}</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="textarea textarea-bordered w-full"
                  rows={4}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t('admin.medium')}</span>
                </label>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  required
                  className="input input-bordered w-full"
                  placeholder={t('admin.mediumPlaceholder')}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t('admin.year')}</span>
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t('admin.price')}</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="input input-bordered w-full"
                  placeholder={t('admin.pricePlaceholder')}
                />
              </div>

              <PhotoUpload photos={photos} onPhotosChange={setPhotos} />

              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <span className="loading loading-spinner"></span> : t('common.save')}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t('admin.manageOrders')}</h2>
            <p className="text-gray-600">{t('admin.orderManagementComingSoon')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

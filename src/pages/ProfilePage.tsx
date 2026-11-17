import React, { useEffect, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../lib/auth';
import { useTranslation } from 'react-i18next';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateUserProfile(phone || undefined);
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('profile.title')}</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('profile.name')}</span>
              </label>
              <input type="text" value={user.name} disabled className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('profile.email')}</span>
              </label>
              <input type="email" value={user.email} disabled className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('profile.phone')}</span>
              </label>
              <PhoneInput
                defaultCountry="pl"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                className="w-full"
                inputClassName="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('profile.locale')}</span>
              </label>
              <input type="text" value={user.locale.toUpperCase()} disabled className="input input-bordered w-full" />
            </div>
            {message && (
              <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                <span>{message}</span>
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? <span className="loading loading-spinner"></span> : t('profile.update')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initializeGoogleButton;
      document.body.appendChild(script);
    };

    const initializeGoogleButton = () => {
      if (window.google && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          width: 300,
        });
      }
    };

    loadGoogleScript();
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      await login(response.credential);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <div ref={buttonRef} className="flex justify-center" />;
};

export default GoogleLoginButton;

import { createContext, useContext, useEffect, useState } from 'react';
import { currencyService } from '../lib/currency';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  availableCurrencies: string[];
  formatPrice: (amountMinor: number, originalCurrency: string) => string;
  lastUpdate: Date | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState('PLN');
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>(['PLN']);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    currencyService.ensureRates().then(() => {
      setAvailableCurrencies(currencyService.getAvailableCurrencies());
      setLastUpdate(currencyService.getLastUpdate());
      
      // Detect user's locale currency
      const userLocale = navigator.language;
      if (userLocale.startsWith('en')) {
        setCurrencyState('EUR');
      }
    });
  }, []);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
  };

  const formatPrice = (amountMinor: number, originalCurrency: string) => {
    return currencyService.format(amountMinor, originalCurrency, currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, availableCurrencies, formatPrice, lastUpdate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

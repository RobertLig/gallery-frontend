interface NBPResponse {
  table: string;
  currency: string;
  rates: Array<{ code: string; mid: number }>;
}

class CurrencyService {
  private rates: Map<string, number> = new Map();
  private lastUpdate: Date | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  async fetchRates(): Promise<void> {
    try {
      const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
      if (!response.ok) throw new Error('Failed to fetch rates');
      
      const data: NBPResponse[] = await response.json();
      this.rates.clear();
      
      // PLN is base currency, rate is 1
      this.rates.set('PLN', 1);
      
      // Add other currencies from NBP
      data[0].rates.forEach((rate) => {
        this.rates.set(rate.code, rate.mid);
      });
      
      this.lastUpdate = new Date();
      localStorage.setItem('nbpRates', JSON.stringify([...this.rates]));
      localStorage.setItem('nbpLastUpdate', this.lastUpdate.toISOString());
    } catch (error) {
      console.error('Failed to fetch NBP rates:', error);
      // Try to load from cache
      this.loadFromCache();
    }
  }

  private loadFromCache(): void {
    const cachedRates = localStorage.getItem('nbpRates');
    const cachedLastUpdate = localStorage.getItem('nbpLastUpdate');
    
    if (cachedRates && cachedLastUpdate) {
      this.rates = new Map(JSON.parse(cachedRates));
      this.lastUpdate = new Date(cachedLastUpdate);
    }
  }

  private isCacheValid(): boolean {
    if (!this.lastUpdate) return false;
    return Date.now() - this.lastUpdate.getTime() < this.CACHE_DURATION;
  }

  async ensureRates(): Promise<void> {
    if (!this.isCacheValid() || this.rates.size === 0) {
      await this.fetchRates();
    } else {
      this.loadFromCache();
    }
  }

  convert(amountMinor: number, fromCurrency: string, toCurrency: string): number {
    const fromRate = this.rates.get(fromCurrency) || 1;
    const toRate = this.rates.get(toCurrency) || 1;
    const amount = amountMinor / 100;
    return (amount * fromRate) / toRate;
  }

  format(amountMinor: number, currency: string, targetCurrency?: string): string {
    const amount = targetCurrency 
      ? this.convert(amountMinor, currency, targetCurrency)
      : amountMinor / 100;
    
    const displayCurrency = targetCurrency || currency;
    return `${amount.toFixed(2)} ${displayCurrency}`;
  }

  getLastUpdate(): Date | null {
    return this.lastUpdate;
  }

  getAvailableCurrencies(): string[] {
    return Array.from(this.rates.keys());
  }
}

export const currencyService = new CurrencyService();

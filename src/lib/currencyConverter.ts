// Exchange rates and currency conversion utilities
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  country: string;
  flag: string;
}

export interface ExchangeRates {
  [key: string]: number;
}

// Supported currencies with their information
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'Eurozone', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', flag: '🇮🇳' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'UAE', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', flag: '🇻🇳' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya', flag: '🇰🇪' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', country: 'Ghana', flag: '🇬🇭' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', country: 'Egypt', flag: '🇪🇬' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', country: 'Argentina', flag: '🇦🇷' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', country: 'Colombia', flag: '🇨🇴' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', country: 'Chile', flag: '🇨🇱' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', country: 'Peru', flag: '🇵🇪' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia', flag: '🇷🇺' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty', country: 'Poland', flag: '🇵🇱' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', country: 'Romania', flag: '🇷🇴' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', country: 'Bulgaria', flag: '🇧🇬' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', country: 'Croatia', flag: '🇭🇷' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', country: 'Israel', flag: '🇮🇱' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'LKR', symbol: 'රු', name: 'Sri Lankan Rupee', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee', country: 'Nepal', flag: '🇳🇵' },
];

// Base exchange rates (relative to USD)
// These should be updated periodically or fetched from an API
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 149.50,
  CNY: 7.24,
  SGD: 1.35,
  CHF: 0.88,
  AED: 3.67,
  SAR: 3.75,
  MYR: 4.63,
  THB: 36.52,
  IDR: 15623.50,
  PHP: 59.47,
  VND: 25455.00,
  KRW: 1318.42,
  HKD: 7.82,
  NZD: 1.67,
  ZAR: 18.87,
  NGN: 901.25,
  KES: 153.25,
  GHS: 12.15,
  EGP: 30.90,
  BRL: 4.98,
  MXN: 17.15,
  ARS: 849.50,
  COP: 3915.75,
  CLP: 923.50,
  PEN: 3.78,
  RUB: 90.45,
  TRY: 31.25,
  PLN: 3.98,
  SEK: 10.67,
  NOK: 10.54,
  DKK: 6.88,
  CZK: 22.67,
  HUF: 351.45,
  RON: 4.61,
  BGN: 1.80,
  HRK: 7.15,
  ILS: 3.78,
  PKR: 278.45,
  LKR: 324.50,
  BDT: 117.25,
  NPR: 132.85,
};

// Cache for exchange rates to avoid frequent API calls
let cachedExchangeRates: ExchangeRates | null = null;
let lastRateUpdate: number = 0;
const RATES_CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetch real-time exchange rates from a free API
 */
export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  const now = Date.now();
  
  // Return cached rates if they're still fresh
  if (cachedExchangeRates && (now - lastRateUpdate) < RATES_CACHE_DURATION) {
    return cachedExchangeRates;
  }

  try {
    // Using a free exchange rate API (you might want to upgrade to a paid plan for production)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    const rates: ExchangeRates = {
      USD: 1,
      ...data.rates
    };

    // Cache the rates
    cachedExchangeRates = rates;
    lastRateUpdate = now;

    return rates;
  } catch (error) {
    console.warn('Failed to fetch exchange rates, using default rates:', error);
    return DEFAULT_EXCHANGE_RATES;
  }
};

/**
 * Convert amount from one currency to another
 */
export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates?: ExchangeRates
): Promise<number> => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const exchangeRates = rates || await fetchExchangeRates();
  
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

/**
 * Format currency amount with proper symbol and decimal places
 */
export const formatCurrency = (
  amount: number,
  currency: string,
  showSymbol: boolean = true
): string => {
  const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency);
  
  if (!currencyInfo) {
    return `${currency} ${amount.toFixed(2)}`;
  }

  // Determine decimal places based on currency
  let decimals = 2;
  if (currency === 'JPY' || currency === 'KRW' || currency === 'VND' || currency === 'IDR') {
    decimals = 0;
  } else if (currency === 'CLP' || currency === 'COP' || currency === 'ARS' || currency === 'NGN') {
    decimals = 0;
  }

  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (showSymbol && currencyInfo.symbol) {
    // Some currencies put the symbol before, some after
    const symbolBefore = ['$', '€', '£', '¥', '₹', 'C$', 'A$', 'S$', 'CHF', 'د.إ', '﷼', 'RM', '฿', 'Rp', '₱', '₫', '₩', 'HK$', 'NZ$', 'R', '₦', 'KSh', 'GH₵', 'E£', 'R$', 'S/', '₽', '₺', 'zł', 'kr', 'Kč', 'Ft', 'lei', 'лв', 'kn', '₪', 'রূ', 'රු', '৳'].includes(currencyInfo.symbol);
    
    if (symbolBefore) {
      return `${currencyInfo.symbol}${formattedAmount}`;
    } else {
      return `${formattedAmount} ${currencyInfo.symbol}`;
    }
  }

  return `${currencyInfo.code} ${formattedAmount}`;
};

/**
 * Get user's detected currency based on timezone/locale
 */
export const detectUserCurrency = (): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language || 'en-US';
  
  // Map common timezones and locales to currencies
  const timezoneMap: { [key: string]: string } = {
    'America/New_York': 'USD',
    'America/Chicago': 'USD',
    'America/Denver': 'USD',
    'America/Los_Angeles': 'USD',
    'Europe/London': 'GBP',
    'Europe/Paris': 'EUR',
    'Europe/Berlin': 'EUR',
    'Europe/Rome': 'EUR',
    'Europe/Madrid': 'EUR',
    'Asia/Kolkata': 'INR',
    'Asia/Dubai': 'AED',
    'Asia/Riyadh': 'SAR',
    'Asia/Tokyo': 'JPY',
    'Asia/Shanghai': 'CNY',
    'Asia/Hong_Kong': 'HKD',
    'Asia/Singapore': 'SGD',
    'Asia/Seoul': 'KRW',
    'Australia/Sydney': 'AUD',
    'Australia/Melbourne': 'AUD',
    'Canada/Eastern': 'CAD',
    'Canada/Central': 'CAD',
    'Canada/Mountain': 'CAD',
    'Canada/Pacific': 'CAD',
  };

  const localeMap: { [key: string]: string } = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'en-NZ': 'NZD',
    'fr-FR': 'EUR',
    'de-DE': 'EUR',
    'es-ES': 'EUR',
    'it-IT': 'EUR',
    'pt-PT': 'EUR',
    'nl-NL': 'EUR',
    'ja-JP': 'JPY',
    'ko-KR': 'KRW',
    'zh-CN': 'CNY',
    'zh-HK': 'HKD',
    'zh-SG': 'SGD',
    'ar-AE': 'AED',
    'ar-SA': 'SAR',
    'ru-RU': 'RUB',
    'tr-TR': 'TRY',
    'pl-PL': 'PLN',
    'sv-SE': 'SEK',
    'nb-NO': 'NOK',
    'da-DK': 'DKK',
    'cs-CZ': 'CZK',
    'hu-HU': 'HUF',
    'ro-RO': 'RON',
    'bg-BG': 'BGN',
    'hr-HR': 'HRK',
    'he-IL': 'ILS',
    'th-TH': 'THB',
    'vi-VN': 'VND',
    'id-ID': 'IDR',
    'tl-PH': 'PHP',
    'ms-MY': 'MYR',
    'en-IN': 'INR',
    'en-PK': 'PKR',
    'en-LK': 'LKR',
    'en-BD': 'BDT',
    'en-NP': 'NPR',
  };

  // Try timezone first, then locale
  return timezoneMap[timezone] || localeMap[locale] || 'USD';
};

/**
 * Get currency info by code
 */
export const getCurrencyInfo = (code: string): Currency | undefined => {
  return SUPPORTED_CURRENCIES.find(c => c.code === code);
};

/**
 * Filter currencies by region or search term
 */
export const filterCurrencies = (searchTerm: string, region?: string): Currency[] => {
  let filtered = SUPPORTED_CURRENCIES;
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(currency => 
      currency.code.toLowerCase().includes(term) ||
      currency.name.toLowerCase().includes(term) ||
      currency.country.toLowerCase().includes(term)
    );
  }
  
  if (region) {
    // You can implement region-based filtering here
    // For now, return all filtered currencies
  }
  
  return filtered;
};

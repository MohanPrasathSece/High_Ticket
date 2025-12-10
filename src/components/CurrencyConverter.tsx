import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, TrendingUp, Globe, DollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  convertCurrency,
  fetchExchangeRates,
  formatCurrency,
  detectUserCurrency,
  getCurrencyInfo,
  SUPPORTED_CURRENCIES,
  ExchangeRates,
  Currency
} from '@/lib/currencyConverter';

interface CurrencyConverterProps {
  baseAmount?: number;
  baseCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
  showConversionHistory?: boolean;
  compact?: boolean;
}

const CurrencyConverter = ({
  baseAmount = 897,
  baseCurrency,
  onCurrencyChange,
  showConversionHistory = false,
  compact = false
}: CurrencyConverterProps) => {
  const [amount, setAmount] = useState(baseAmount);
  const [fromCurrency, setFromCurrency] = useState(baseCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState(detectUserCurrency());
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [conversionHistory, setConversionHistory] = useState<Array<{
    from: string;
    to: string;
    amount: number;
    result: number;
    timestamp: Date;
  }>>([]);

  // Initialize and fetch exchange rates
  useEffect(() => {
    fetchRates();
  }, []);

  // Auto-convert when inputs change
  useEffect(() => {
    if (exchangeRates && amount && fromCurrency && toCurrency) {
      performConversion();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const rates = await fetchExchangeRates();
      setExchangeRates(rates);
      setLastUpdated(new Date());
      toast({
        title: "Exchange Rates Updated",
        description: "Latest currency rates loaded successfully",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exchange rates. Using cached data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const performConversion = async () => {
    if (!exchangeRates) return;

    try {
      const result = await convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);
      setConvertedAmount(result);

      // Add to history if enabled
      if (showConversionHistory) {
        const newEntry = {
          from: fromCurrency,
          to: toCurrency,
          amount,
          result,
          timestamp: new Date()
        };
        setConversionHistory(prev => [newEntry, ...prev.slice(0, 4)]); // Keep last 5 conversions
      }

      // Notify parent component of currency change
      if (onCurrencyChange && toCurrency !== toCurrency) {
        onCurrencyChange(toCurrency);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion Error",
        description: "Failed to convert currency. Please try again.",
        variant: "destructive",
      });
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getPopularCurrencies = () => {
    return ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'SGD'];
  };

  const getCurrencyIcon = (currencyCode: string) => {
    const currency = getCurrencyInfo(currencyCode);
    return currency?.flag || '🌍';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <Globe className="w-4 h-4 text-yellow-400" />
        <span className="text-sm text-gray-300">
          {formatCurrency(amount, fromCurrency)} = 
        </span>
        <span className="text-sm font-semibold text-white">
          {convertedAmount ? formatCurrency(convertedAmount, toCurrency) : 'Loading...'}
        </span>
        <Badge variant="outline" className="text-xs">
          {toCurrency}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              Currency Converter
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time exchange rates for international customers
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRates}
            disabled={isLoading}
            className="border-gray-600 hover:bg-gray-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Enter amount"
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-gray-400 text-xs">({currency.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-gray-400 text-xs">({currency.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapCurrencies}
            className="border-gray-600 hover:bg-gray-700"
          >
            ⇄ Swap
          </Button>
        </div>

        {/* Conversion Result */}
        {convertedAmount !== null && (
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {formatCurrency(convertedAmount, toCurrency)}
            </div>
            <div className="text-sm text-gray-400">
              {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
            </div>
            {exchangeRates && (
              <div className="text-xs text-gray-500 mt-2">
                Rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            )}
          </div>
        )}

        {/* Popular Currencies Quick Select */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Popular Currencies</label>
          <div className="flex flex-wrap gap-2">
            {getPopularCurrencies().map((currency) => (
              <Button
                key={currency}
                variant={toCurrency === currency ? "default" : "outline"}
                size="sm"
                onClick={() => setToCurrency(currency)}
                className={toCurrency === currency ? "bg-yellow-400 text-black" : "border-gray-600 hover:bg-gray-700"}
              >
                <span className="mr-1">{getCurrencyIcon(currency)}</span>
                {currency}
              </Button>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-xs text-gray-500 text-center">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {/* Conversion History */}
        {showConversionHistory && conversionHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Conversions</h4>
            <div className="space-y-1">
              {conversionHistory.map((entry, index) => (
                <div key={index} className="text-xs text-gray-400 bg-gray-700 rounded p-2">
                  {formatCurrency(entry.amount, entry.from)} → {formatCurrency(entry.result, entry.to)}
                  <div className="text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;

import yahooFinance from 'yahoo-finance2';

class YahooFinanceClient {
  private readonly rateLimit: number = 10; // Requests per second
  private lastRequestTime: number = 0;

  async getQuote(symbol: string) {
    await this.enforceRateLimit();
    return yahooFinance.quote(symbol);
  }

  async getHistoricalData(
    symbol: string, 
    options: { period1: string; interval: "1d" }
  ) {
    await this.enforceRateLimit();
    return yahooFinance.historical(symbol, options);
  }

  private async enforceRateLimit() {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    const minDelay = 1000 / this.rateLimit;
    
    if (elapsed < minDelay) {
      await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
    }
    
    this.lastRequestTime = Date.now();
  }
}

export default new YahooFinanceClient();
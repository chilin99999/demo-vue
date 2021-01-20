enum Mode {
  CACHE_FIRST = 'cache-first',
  CACHE_ONLY = 'cache-only',
}

interface Config {
  maxAge: number;
  mode: Mode;
}

interface CacheMap {
  [key: string]: CacheItem;
}

interface CacheItem {
  value: unknown;
  timestamp: number;
}

class Optimism {
  optimismCacheKey: string;
  config: Config;
  cacheMap: CacheMap;

  constructor() {
    this.optimismCacheKey = 'OPTIMISM_CACHE';
    this.config = {
      maxAge: 1000 * 60 * 10, // 10 mins
      mode: Mode.CACHE_FIRST,
    };
    this.cacheMap = {};
    this.initialCacheMap();
  }

  private initialCacheMap(): void {
    const cacheString: string | null = localStorage.getItem(this.optimismCacheKey);
    if(cacheString == null) {
      return;
    }
    const cache = JSON.parse(cacheString);
    this.clearExpiredCacheData(cache);
    this.cacheMap = cache;
  }

  private clearExpiredCacheData(cache: CacheMap) {
    for(const key in cache) {
      if(this.isExpired(cache[key])) {
        delete cache[key];
      }
    }
  }

  private isExpired(cacheItem: CacheItem, maxAge = this.config.maxAge): boolean {
    return cacheItem.timestamp + maxAge < Date.now();
  }

  public setConfig(config: Config): void {
    Object.assign(this.config, config);
  }

  private setCache(key: string, value: unknown): void {
    this.cacheMap[key] = {
      value,
      timestamp: Date.now(),
    };
    this.clearExpiredCacheData(this.cacheMap);
    localStorage.setItem(this.optimismCacheKey, JSON.stringify(this.cacheMap));
  }

  public async cache(key: string, action: Function, callback: Function, config: Config = this.config) {
    const cacheItem = this.cacheMap[key];
    if(cacheItem && cacheItem.value && !this.isExpired(cacheItem)) {
      callback(cacheItem.value);
      if(config.mode == Mode.CACHE_ONLY) {
        return;
      }
    }
    const result = await action();

    this.setCache(key, result);
    callback(result);
  }

  public clear() {
    this.cacheMap = {};
    localStorage.removeItem(this.optimismCacheKey);
  }
}

export default new Optimism();
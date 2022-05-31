export interface KeyValueCacheSetOptions {
    ttl?: number | null;
}
export interface KeyValueCache<V = string> {
    get(key: string): Promise<V | undefined>;
    set(key: string, value: V, options?: KeyValueCacheSetOptions): Promise<void>;
    delete(key: string): Promise<boolean | void>;
}
//# sourceMappingURL=KeyValueCache.d.ts.map
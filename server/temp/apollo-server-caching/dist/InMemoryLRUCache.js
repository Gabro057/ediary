"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLRUCache = void 0;
const lru_cache_1 = __importDefault(require("lru-cache"));
function defaultLengthCalculation(item) {
    if (Array.isArray(item) || typeof item === 'string') {
        return item.length;
    }
    return 1;
}
class InMemoryLRUCache {
    constructor({ maxSize = Infinity, sizeCalculator = defaultLengthCalculation, onDispose, } = {}) {
        this.store = new lru_cache_1.default({
            max: maxSize,
            length: sizeCalculator,
            dispose: onDispose,
        });
    }
    async get(key) {
        return this.store.get(key);
    }
    async set(key, value, options) {
        const maxAge = (options === null || options === void 0 ? void 0 : options.ttl) && options.ttl * 1000;
        this.store.set(key, value, maxAge);
    }
    async delete(key) {
        this.store.del(key);
    }
    async flush() {
        this.store.reset();
    }
    async getTotalSize() {
        return this.store.length;
    }
    static jsonBytesSizeCalculator(obj) {
        return Buffer.byteLength(JSON.stringify(obj), 'utf8');
    }
}
exports.InMemoryLRUCache = InMemoryLRUCache;
//# sourceMappingURL=InMemoryLRUCache.js.map

import { TridentAsset, TridentConfig } from './types';
import { TridentStore } from './store';
import { FontManager } from './font-manager';

export class TridentEngine {
    static async load(assets: TridentAsset[], config: TridentConfig = {}): Promise<void> {
        const promises = assets.map(asset => this.loadAsset(asset, config));
        await Promise.all(promises);
    }

    private static async loadAsset(asset: TridentAsset, config: TridentConfig): Promise<void> {
        const maxRetries = config.maxRetries || 3;

        if (asset.type === 'font') {
            return FontManager.load(asset);
        }

        // For images and videos, we use Method 1: Origin Racing & Method 2: Fallback Cascade
        const sources = this.getSources(asset.src);
        let lastError: any = null;

        for (const url of sources) {
            for (let attempt = 0; attempt < maxRetries; attempt++) {
                try {
                    const blobUrl = await this.fetchWithTimeout(url, config.timeout || 30000);
                    TridentStore.set(asset.id, blobUrl);
                    if (config.debug) console.log(`[Trident] Asset ready: ${asset.id} from ${url}`);
                    return;
                } catch (e) {
                    lastError = e;
                    // Method 6: Retry with Jitter
                    if (attempt < maxRetries - 1) {
                        await new Promise(r => setTimeout(r, 500 + Math.random() * 1000));
                    }
                }
            }
        }

        throw new Error(`[Trident] Failed to load asset ${asset.id} after ${maxRetries} attempts and all fallbacks. Last error: ${lastError}`);
    }

    private static getSources(src: any): string[] {
        const s = [];
        if (src.local) s.push(src.local.startsWith('http') ? src.local : `/${src.local}`);
        if (src.remote) s.push(src.remote);
        return s;
    }

    private static async fetchWithTimeout(url: string, timeout: number): Promise<string> {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            // Method 3: Blob Immutability
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } finally {
            clearTimeout(id);
        }
    }
}

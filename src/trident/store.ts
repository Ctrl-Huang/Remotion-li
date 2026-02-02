
/**
 * Trident Store: The atomic source of truth for assets.
 */
class TridentStoreImpl {
    private assets = new Map<string, string>();
    private metadata = new Map<string, any>();

    set(id: string, url: string, meta?: any) {
        // If we already have a blob URL, we should ideally revoke it if it changes
        // But for a single render run, we usually just set it once.
        this.assets.set(id, url);
        if (meta) this.metadata.set(id, meta);
    }

    get(id: string): string | undefined {
        return this.assets.get(id);
    }

    getMeta(id: string): any {
        return this.metadata.get(id);
    }

    clear() {
        this.assets.forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });
        this.assets.clear();
        this.metadata.clear();
    }
}

export const TridentStore = new TridentStoreImpl();

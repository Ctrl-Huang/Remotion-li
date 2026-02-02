
export type AssetType = 'font' | 'image' | 'video' | 'json';
export type LoadStrategy = 'greedy' | 'lazy';

export interface AssetSource {
    local?: string;
    remote?: string;
    systemNames?: string[];
}

export interface TridentAsset {
    id: string;
    type: AssetType;
    src: AssetSource;
    strategy?: LoadStrategy;
    fallback?: {
        fontStack?: string[];
    };
    integrity?: string; // SHA-256 or similar for SRI
}

export interface TridentConfig {
    timeout?: number;
    maxRetries?: number;
    debug?: boolean;
}

export type LoadingStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface TridentState {
    status: LoadingStatus;
    progress: number;
    errors: Array<{ id: string; error: string }>;
    loadedCount: number;
    totalCount: number;
}

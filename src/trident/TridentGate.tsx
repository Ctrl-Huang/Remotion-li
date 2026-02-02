
import React, { useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { TridentAsset, TridentConfig, TridentState } from './types';
import { TridentEngine } from './engine';

interface Props {
    assets: TridentAsset[];
    config?: TridentConfig;
    children: React.ReactNode;
}

export const TridentGate: React.FC<Props> = ({ assets, config = {}, children }) => {
    const [state, setState] = useState<TridentState>({
        status: 'idle',
        progress: 0,
        errors: [],
        loadedCount: 0,
        totalCount: assets.length
    });

    const [handle] = useState(() => delayRender('Trident Ultra: Waiting for high-redundancy assets'));

    useEffect(() => {
        let mounted = true;

        const loadAll = async () => {
            setState(s => ({ ...s, status: 'loading' }));

            try {
                await TridentEngine.load(assets, config);
                if (mounted) {
                    setState(s => ({ ...s, status: 'ready', progress: 100 }));
                    continueRender(handle);
                }
            } catch (e: any) {
                if (mounted) {
                    setState(s => ({
                        ...s,
                        status: 'error',
                        errors: [{ id: 'global', error: e.message || 'Unknown error' }]
                    }));
                    // In a real production environment, we might still continueRender if we want fallbacks to show,
                    // but for "absolute stability", we might want to block or show an error overlay.
                    console.error("[Trident Ultra] Fatal Error:", e);
                }
            }
        };

        loadAll();
        return () => { mounted = false; };
    }, [assets, config, handle]);

    if (state.status === 'error') {
        return (
            <div style={{
                backgroundColor: '#1a0000',
                color: '#ff5555',
                padding: '40px',
                fontFamily: 'monospace',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '40px' }}>Trident Ultra: Fatal Resource Error</h1>
                <p style={{ fontSize: '20px', maxWidth: '800px' }}>{state.errors[0]?.error}</p>
                <div style={{ marginTop: '20px', opacity: 0.5 }}>Check console for details and verify ASSETS_MANIFEST.</div>
            </div>
        );
    }

    if (state.status !== 'ready') {
        return (
            <div style={{
                backgroundColor: '#020205',
                color: '#00F0FF',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'system-ui'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔱 TRIDENT ULTRA v2.0</div>
                <div style={{ width: '300px', height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${state.progress}%`,
                        height: '100%',
                        background: '#00F0FF',
                        transition: 'width 0.3s'
                    }} />
                </div>
                <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.7 }}>
                    Stabilizing absolute asset environment...
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

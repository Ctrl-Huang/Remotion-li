
import { TridentStore } from './store';
import { TridentAsset } from './types';

export class FontManager {
    static async load(asset: TridentAsset): Promise<void> {
        const { id, src, fallback } = asset;
        const sources = this.getSources(src);

        // Method 8: System Probing
        if (src.systemNames) {
            for (const name of src.systemNames) {
                if (this.isFontAvailable(name)) {
                    console.log(`[Trident] System font found: ${name}`);
                    this.registerCSS(id, name, fallback?.fontStack);
                    return;
                }
            }
        }

        // Racing & Sequential Fallback
        let loaded = false;
        for (const url of sources) {
            try {
                await this.loadFontFace(id, url);
                loaded = true;
                console.log(`[Trident] Font loaded: ${id} from ${url}`);
                break;
            } catch (e) {
                console.warn(`[Trident] Failed to load font ${id} from ${url}, trying fallback...`);
            }
        }

        if (!loaded && fallback?.fontStack) {
            console.error(`[Trident] All font sources failed for ${id}. Using fallback stack.`);
            this.registerCSS(id, fallback.fontStack[0] || 'sans-serif', fallback.fontStack);
        }
    }

    private static getSources(src: any): string[] {
        const s = [];
        if (src.local) s.push(src.local.startsWith('http') ? src.local : `/${src.local}`);
        if (src.remote) s.push(src.remote);
        return s;
    }

    private static isFontAvailable(name: string): boolean {
        if (typeof document === 'undefined') return false;
        // Method 18 check: document.fonts API
        return (document as any).fonts?.check?.(`12px "${name}"`) || false;
    }

    private static async loadFontFace(id: string, url: string): Promise<void> {
        const font = new FontFace(`Trident_${id}`, `url(${url})`);
        await font.load();
        (document as any).fonts.add(font);
        this.registerCSS(id, `Trident_${id}`);
    }

    private static registerCSS(id: string, fontName: string, stack: string[] = []) {
        if (typeof document === 'undefined') return;
        const styleId = `trident-font-${id}`;
        let el = document.getElementById(styleId);
        if (!el) {
            el = document.createElement('style');
            el.id = styleId;
            document.head.appendChild(el);
        }
        const fullStack = [`"${fontName}"`, ...stack].join(', ');
        el.innerHTML = `:root { --font-${id}: ${fullStack}; }`;
        TridentStore.set(id, fontName, { isCSSVariable: true });
    }
}

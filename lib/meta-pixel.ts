/**
 * Meta Pixel + Conversions API — Utility Helper
 * 
 * Dispara eventos no Browser (fbq) e no Servidor (CAPI) em paralelo,
 * garantindo deduplicação via event_id idêntico.
 */

// ─── Cookie helpers ──────────────────────────────────────────────────────────
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// ─── Generate unique event ID ────────────────────────────────────────────────
function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface TrackEventOptions {
  /** Optional user data for enhanced matching (will be hashed server-side) */
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

interface CustomData {
  [key: string]: any;
  value?: number;
  currency?: string;
  content_name?: string;
}

// ─── Main track function ─────────────────────────────────────────────────────
export async function trackEvent(
  eventName: string,
  customData: CustomData = {},
  options: TrackEventOptions = {}
): Promise<void> {
  const eventId = generateEventId();
  const timestamp = Math.floor(Date.now() / 1000);
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');
  const eventSourceUrl = typeof window !== 'undefined' ? window.location.href : '';
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  // 1) Browser Pixel (if loaded — won't error if blocked by adblocker)
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, customData, { eventID: eventId });
    }
  } catch (e) {
    // Silently fail — CAPI will still send
  }

  // 2) Server-side CAPI (fire & forget, don't block UI)
  try {
    fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventID: eventId,
        timestamp,
        customData,
        userData: options.userData || {},
        fbp,
        fbc,
        eventSourceUrl,
        userAgent,
      }),
    }).catch(() => {
      // Silently fail
    });
  } catch (e) {
    // Silently fail
  }
}

// ─── Pixel initialization snippet (for layout <Script>) ─────────────────────
export function getPixelInitScript(pixelId: string): string {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
}

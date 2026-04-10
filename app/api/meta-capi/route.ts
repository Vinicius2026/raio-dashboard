import { NextResponse } from 'next/server';
import crypto from 'crypto';

// ─── SHA-256 hashing for PII ─────────────────────────────────────────────────
function hashSHA256(value: string | undefined | null): string | undefined {
    if (!value) return undefined;
    return crypto
        .createHash('sha256')
        .update(value.trim().toLowerCase())
        .digest('hex');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            eventName,
            eventID,
            timestamp,
            customData,
            userData,
            fbp,
            fbc,
            eventSourceUrl,
            userAgent,
        } = body;

        const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
        const accessToken = process.env.META_CAPI_TOKEN;

        if (!pixelId || !accessToken) {
            console.warn('[Meta CAPI] NEXT_PUBLIC_META_PIXEL_ID ou META_CAPI_TOKEN ausente em .env.local');
            return NextResponse.json(
                { success: false, message: 'Configuração Meta ausente' },
                { status: 200 } // 200 to not break client
            );
        }

        // Build user_data with hashed PII + browser identifiers
        const user_data: Record<string, any> = {
            client_user_agent: userAgent || request.headers.get('user-agent') || '',
            client_ip_address:
                request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                request.headers.get('x-real-ip') ||
                '0.0.0.0',
        };

        // Add Facebook browser cookies for matching quality
        if (fbp) user_data.fbp = fbp;
        if (fbc) user_data.fbc = fbc;

        // Hash PII fields if provided
        if (userData) {
            if (userData.email) user_data.em = [hashSHA256(userData.email)];
            if (userData.phone) user_data.ph = [hashSHA256(userData.phone)];
            if (userData.firstName) user_data.fn = [hashSHA256(userData.firstName)];
            if (userData.lastName) user_data.ln = [hashSHA256(userData.lastName)];
        }

        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: timestamp || Math.floor(Date.now() / 1000),
                    action_source: 'website',
                    event_id: eventID,
                    event_source_url: eventSourceUrl || '',
                    user_data,
                    custom_data: customData || {},
                },
            ],
            // Uncomment to test: test_event_code: "TEST12345"
        };

        const response = await fetch(
            `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('[Meta CAPI] API Error:', data);
        }

        return NextResponse.json({ success: response.ok, api_response: data });
    } catch (error) {
        console.error('[Meta CAPI] Server Error:', error);
        return NextResponse.json(
            { success: false, message: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

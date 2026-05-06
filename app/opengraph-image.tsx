import { ImageResponse } from 'next/og';
import { site } from '@/lib/data/site';

export const runtime = 'edge';
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0a0a0a',
          color: '#ededed',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundImage:
            'radial-gradient(circle at 25% 30%, rgba(99,102,241,0.18), transparent 50%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: '#ededed',
              color: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 18, color: 'rgba(237,237,237,0.6)' }}>
            smapurbo.me
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>SHIPPING SOFTWARE</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              FROM DHAKA.
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: '#6366f1',
                  marginTop: 24,
                }}
              />
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: 'rgba(237,237,237,0.6)',
            fontSize: 22,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ color: '#ededed', fontSize: 28, fontWeight: 600 }}>
              {site.name}
            </div>
            <div>Founding Engineer · ClassTablet · Full-Stack · AI/ML</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              fontSize: 18,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: '#10b981',
              }}
            />
            Available
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function clamp(value: string | null, max: number) {
  if (!value) return undefined;
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = clamp(searchParams.get('title'), 90) || 'mujibai';
  const subtitle = clamp(searchParams.get('subtitle'), 140);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#001434',
        backgroundImage:
          'radial-gradient(circle at 80% 20%, rgba(6,182,212,0.45), transparent 55%), radial-gradient(circle at 10% 90%, rgba(6,182,212,0.25), transparent 50%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: '#06B6D4',
          }}
        />
        <span
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          mujibai
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: 980,
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 30,
            color: '#B7D9E8',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>,
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
    }
  );
}

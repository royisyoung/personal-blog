import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'MyClaudes - Personal Technology Blog';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        padding: '60px',
      }}
    >
      <div
        style={{
          fontSize: '64px',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.1,
          fontFamily: 'GeistSans',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '24px',
          color: '#a3a3a3',
          marginTop: '20px',
          fontFamily: 'GeistSans',
        }}
      >
        myclaudes.dev
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

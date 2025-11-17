import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Avni - Digital Platform for NGO Field Operations';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #419372 0%, #0b2540 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '60px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#0b2540',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Avni
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#419372',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Digital Platform for NGOs
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#5a6c7d',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Empowering field operations with sustainable digital tools
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

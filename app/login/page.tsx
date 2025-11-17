import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Login | Avni - Digital Platform for NGOs',
  description: 'Login to your Avni account to manage your field operations, track programs, and access real-time data.',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[72px] bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-anek font-bold text-[#0b2540] mb-6 text-center">
            Login to Avni
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Access your Avni instance to manage field operations
          </p>
          <div className="space-y-4">
            <a
              href="https://app.avniproject.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-[#419372] text-white rounded-lg font-anek font-semibold text-center hover:bg-[#357a5e] transition-colors"
            >
              Go to Avni App
            </a>
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#419372] hover:underline">
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

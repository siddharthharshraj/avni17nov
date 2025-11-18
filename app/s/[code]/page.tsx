"use client";

import { useEffect, useState } from "react";

export default function ShortUrlRedirect() {
  const [code, setCode] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(true);

  useEffect(() => {
    // Derive code from current URL on the client
    try {
      const path = window.location.pathname; // e.g. /s/xsp0e
      const segments = path.split("/").filter(Boolean);
      if (segments[0] === "s" && segments[1]) {
        const derivedCode = segments[1];
        setCode(derivedCode);

        // Call API to resolve the long URL and redirect
        fetch(`/api/shorten?code=${encodeURIComponent(derivedCode)}`)
          .then(async (res) => {
            if (!res.ok) return;
            const data = await res.json();
            if (data?.url) {
              window.location.href = data.url as string;
            } else {
              setIsResolving(false);
            }
          })
          .catch(() => {
            setIsResolving(false);
          });
      } else {
        setIsResolving(false);
      }
    } catch {
      setIsResolving(false);
    }
  }, []);

  if (isResolving) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-anek font-bold text-3xl text-[#0b2540] mb-4">
            Redirecting...
          </h1>
          <p className="font-noto text-[#5a6c7d]">
            Please wait while we take you to the original link.
          </p>
        </div>
      </div>
    );
  }

  // If URL not found or error, show clean 404 page
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-anek font-bold text-6xl text-[#FFD84D] mb-4">404</h1>
        <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-4">
          Short URL Not Found
        </h2>
        <p className="font-noto text-[#5a6c7d] mb-8">
          The short URL <span className="font-mono text-[#419372]">/s/{code ?? ""}</span> does not exist or has expired.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#419372] text-white font-anek font-medium rounded-lg hover:bg-[#357a5e] transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

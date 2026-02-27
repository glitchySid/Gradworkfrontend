"use client";

const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PROJECT_URL: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

function summarize(value: string | undefined) {
  if (!value) return { present: false, preview: "(missing)" };
  return {
    present: true,
    preview: value.length > 16 ? `${value.slice(0, 8)}...${value.slice(-4)}` : value,
  };
}

export default function EnvDebugPage() {
  const rows = Object.entries(env).map(([key, value]) => [key, summarize(value)] as const);

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Runtime Env Debug</h1>
      <p className="text-gray-700 mb-6">
        Values shown below are from the browser bundle at runtime.
      </p>
      <div className="space-y-3">
        {rows.map(([key, info]) => (
          <div key={key} className="border border-gray-200 rounded-lg p-3">
            <div className="font-mono text-sm">{key}</div>
            <div className={`text-sm ${info.present ? "text-green-700" : "text-red-700"}`}>
              {info.present ? "present" : "missing"}
            </div>
            <div className="font-mono text-xs text-gray-600">{info.preview}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

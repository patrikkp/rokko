import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  document.body.innerHTML = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:80px auto;padding:28px;
      border:2px solid #ef4444;border-radius:16px;background:#fef2f2">
      <h2 style="color:#dc2626;margin:0 0 12px 0">⚠️ Nedostaje .env konfiguracija</h2>
      <p style="color:#7f1d1d;margin:0 0 10px 0">
        Napravi fajl <code style="background:#fff;padding:2px 6px;border-radius:4px">project/.env</code>
        sa sljedecim sadrzajem:
      </p>
      <pre style="background:#fff;padding:14px;border-radius:8px;border:1px solid #fca5a5;
        color:#1f2937;font-size:13px;overflow:auto">VITE_SUPABASE_URL=https://tvoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=tvoj-anon-key</pre>
      <p style="color:#7f1d1d;margin:10px 0 0 0;font-size:14px">
        📍 Vrijednosti nadji u:
        <strong>Supabase dashboard → Project Settings → API</strong>
      </p>
      <p style="color:#7f1d1d;margin:8px 0 0 0;font-size:13px">
        Nakon sto kreiras .env, spremi ga i osvjezi browser.
      </p>
    </div>
  `;
  throw new Error(
    '[Garant] Missing environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY.\n' +
    'Create a project/.env file. See project/.env.example for reference.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key.
 * Only import this from server code (API routes, server actions) —
 * never expose the service role key to the browser.
 */
function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;
  if (!cachedClient) {
    cachedClient = createClient(url, serviceRoleKey);
  }
  return cachedClient;
}

export interface DonationRecord {
  reference: string;
  amountInPesewas: number;
  currency: string;
  donorEmail: string;
}

/**
 * Persists a successful donation to the `donations` table in Supabase.
 *
 * Suggested schema:
 *   create table donations (
 *     id uuid primary key default gen_random_uuid(),
 *     reference text unique not null,
 *     amount_pesewas integer not null,
 *     currency text not null,
 *     donor_email text not null,
 *     created_at timestamptz default now()
 *   );
 */
export async function recordDonation(donation: DonationRecord) {
  const client = getSupabaseServerClient();

  if (!client) {
    console.info("[donation] Supabase not configured. Donation:", donation);
    return;
  }

  const { error } = await client.from("donations").insert({
    reference: donation.reference,
    amount_pesewas: donation.amountInPesewas,
    currency: donation.currency,
    donor_email: donation.donorEmail,
  });

  if (error) {
    console.error("Failed to record donation in Supabase:", error);
    throw error;
  }
}

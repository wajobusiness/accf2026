import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tqeqccszyxstsxtoffzf.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_1xvhvHXbMvSIVAFhdbscLw_zAKZUENV';

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );


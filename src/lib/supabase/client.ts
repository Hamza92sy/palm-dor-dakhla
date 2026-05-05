import { createClient } from '@supabase/supabase-js'

// Browser client — uses public anon key, safe to use in client components
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbybdtacoqvgcijrkzkv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing in .env file')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

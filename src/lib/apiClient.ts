// API Configuration for Supabase REST API
const SUPABASE_URL = 'https://kbybdtacoqvgcijrkzkv.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL or Key is missing in .env file')
}

const API_BASE_URL = `${SUPABASE_URL}/rest/v1`

// Common headers for all requests
export const getApiHeaders = () => ({
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  apikey: SUPABASE_ANON_KEY,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
})

// Helper function to make API requests
export const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getApiHeaders(),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  // For DELETE requests, return empty array if no content
  if (options.method === 'DELETE' && response.status === 204) {
    return [] as T
  }

  return response.json() as Promise<T>
}

export { API_BASE_URL }

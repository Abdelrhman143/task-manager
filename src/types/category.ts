export interface Category {
  id: number
  name: string
  color: string
  icon_url: string
  image_filter: 'default' | 'grayscale' | 'sepia' | 'blur'
  image_seed_offset: number
  created_at: string
}

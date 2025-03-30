import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Загрузка профиля
export async function fetchProfile(user_id) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user_id)
    .single()

  if (error && error.code !== 'PGRST116') { // Not found
    console.error("Ошибка загрузки профиля:", error.message)
    return null
  }

  return data
}

// Сохранение (создание или обновление) профиля
export async function saveProfile(user_id, profileData) {
  // Проверяем: есть ли уже профиль
  const existing = await fetchProfile(user_id)

  if (existing) {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', user_id)

    if (error) {
      console.error("Ошибка при обновлении профиля:", error.message)
      return false
    }

    return true
  } else {
    const { error } = await supabase
      .from('profiles')
      .insert({ ...profileData, user_id })

    if (error) {
      console.error("Ошибка при создании профиля:", error.message)
      return false
    }

    return true
  }
}
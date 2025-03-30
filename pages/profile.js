import { useEffect, useState } from 'react'
import { supabase, fetchProfile, saveProfile } from '../lib/supabase'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ height: '', weight: '', birth_year: '' })
  const [age, setAge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        loadProfile(session.user.id)
      }
    })
  }, [])

  const loadProfile = async (user_id) => {
    setLoading(true)
    const data = await fetchProfile(user_id)
    if (data) {
      setProfile({
        height: data.height || '',
        weight: data.weight || '',
        birth_year: data.birth_year || ''
      })
      if (data.birth_year) {
        const currentYear = new Date().getFullYear()
        setAge(currentYear - data.birth_year)
      }
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!user) return
    const success = await saveProfile(user.id, profile)
    if (success) {
      const currentYear = new Date().getFullYear()
      setAge(currentYear - profile.birth_year)
      setMessage('✅ Профиль обновлён!')
    } else {
      setMessage('❌ Ошибка при сохранении.')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">👤 Профиль</h1>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <label className="block mb-2">Рост (см)</label>
          <input
            type="number"
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) })}
            className="border p-2 rounded w-full mb-4"
          />

          <label className="block mb-2">Вес (кг)</label>
          <input
            type="number"
            value={profile.weight}
            onChange={(e) => setProfile({ ...profile, weight: parseInt(e.target.value) })}
            className="border p-2 rounded w-full mb-4"
          />

          <label className="block mb-2">Год рождения</label>
          <input
            type="number"
            value={profile.birth_year}
            onChange={(e) => setProfile({ ...profile, birth_year: parseInt(e.target.value) })}
            className="border p-2 rounded w-full mb-4"
          />

          {age && <p className="mb-4">🧠 Возраст: <strong>{age}</strong> лет</p>}

          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            💾 Сохранить
          </button>

          {message && <p className="mt-4 text-green-600">{message}</p>}
        </>
      )}
    </div>
  )
}
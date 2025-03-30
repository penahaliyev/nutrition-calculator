import { useEffect, useState } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ height: '', weight: '', birth_year: '' })
  const [age, setAge] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user
      setUser(currentUser)

      if (!currentUser) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single()

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

    init()
  }, [])

  const handleSave = async () => {
    if (!user) return

    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const payload = { ...profile, user_id: user.id }

    let result
    if (data) {
      result = await supabase.from('profiles').update(payload).eq('user_id', user.id)
    } else {
      result = await supabase.from('profiles').insert(payload)
    }

    if (result.error) {
      setMessage('❌ Ошибка при сохранении')
    } else {
      const currentYear = new Date().getFullYear()
      setAge(currentYear - profile.birth_year)
      setMessage('✅ Профиль обновлён!')
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
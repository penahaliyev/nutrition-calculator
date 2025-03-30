
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">🏠 Главная страница</h1>
      <p className="mb-4">Добро пожаловать в Nutrition Calculator</p>
      <div className="flex gap-4">
        <Link href="/calculator" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Калькулятор</Link>
        <Link href="/profile" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Профиль</Link>
      </div>
    </div>
  )
}

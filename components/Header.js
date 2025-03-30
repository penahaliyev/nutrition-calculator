
export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-green-600">Fit Journey</h1>
      <nav className="space-x-4">
        <a href="/" className="text-gray-700 hover:text-green-600">Главная</a>
        <a href="/calculator" className="text-gray-700 hover:text-green-600">Калькулятор</a>
        <a href="/profile" className="text-gray-700 hover:text-green-600">Профиль</a>
      </nav>
    </header>
  )
}


import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Твое фитнес-путешествие начинается здесь 💪</h2>
          <p className="text-gray-600 mb-6">
            Используй наш калькулятор питания, чтобы достичь своих целей. Управляй профилем и отслеживай прогресс!
          </p>
          <a href="/calculator" className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-600 transition">
            Начать расчёт
          </a>
        </section>
      </main>
    </div>
  )
}

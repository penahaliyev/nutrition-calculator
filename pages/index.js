
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>HealthCalc</title>
      </Head>
      <main className="min-h-screen bg-gray-50">
        <header className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
          <div className="text-xl font-bold">HealthCalc</div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-700 hover:text-black">Home</a>
            <a href="#" className="text-sm text-gray-700 hover:text-black">My Dashboard</a>
            <a href="#" className="text-sm text-gray-700 hover:text-black">Calculators</a>
            <a href="#" className="text-sm text-gray-700 hover:text-black">🌐</a>
            <a href="#" className="text-sm text-blue-600 font-semibold">Login</a>
          </nav>
        </header>

        <section className="text-center py-20 px-4">
          <div className="mb-4">
            <span className="text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-3 py-1">Health & Fitness</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Understand your body better</h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">Use our precision calculators to understand your body metrics and optimize your health journey.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700">Get Started</button>
            <button className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Create Account</button>
          </div>
        </section>

        <section className="bg-blue-50 text-center px-4 py-10">
          <h2 className="text-lg font-semibold mb-2">Get Your Personalized Dashboard</h2>
          <p className="text-gray-600 mb-4 text-sm">Register for an account to access your personal dashboard with all your health metrics and custom meal plans in one place.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700">Register Now</button>
        </section>

        <section className="py-16 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'BMR', desc: 'Calculate your Basal Metabolic Rate', color: 'blue' },
            { title: 'BMI', desc: 'Calculate your Body Mass Index', color: 'green' },
            { title: 'Calories', desc: 'Calculate daily calorie needs', color: 'orange' },
            { title: 'Macros', desc: 'Calculate your macronutrient ratio', color: 'purple' },
            { title: 'Meal Plan', desc: 'Create personalized meal plans', color: 'rose' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 border text-left shadow-sm hover:shadow-md transition">
              <div className={`w-10 h-10 rounded-full bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center mb-4`}>
                <span className="text-xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
              <a href="#" className="text-sm text-blue-600 font-medium">Try Calculator →</a>
            </div>
          ))}
        </section>

        <footer className="text-center text-sm text-gray-500 py-8 border-t border-gray-200">
          HealthCalc © - All rights reserved
        </footer>
      </main>
    </>
  )
}

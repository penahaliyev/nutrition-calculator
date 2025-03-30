import Head from "next/head";
import NutritionCalculator from "../components/NutritionCalculator";

export default function Home() {
  return (
    <>
      <Head>
        <title>Калькулятор Питания</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-4">
        <NutritionCalculator />
      </main>
    </>
  );
}
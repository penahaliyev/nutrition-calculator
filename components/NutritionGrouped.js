import React, { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Select } from "./ui/select";

const DATA = {
  "Протеин": {
    "Говядина": { protein: 26, fat: 20, carb: 0, cal: 250 },
    "Куриная грудка": { protein: 31, fat: 3.6, carb: 0, cal: 165 },
    "Сыр": { protein: 25, fat: 26, carb: 0, cal: 350 },
    "Яйцо куриное (1 шт.)": { protein: 6.5, fat: 5.3, carb: 0.6, cal: 68, per: "unit" }
  },
  "Углевод": {
    "Рис вареный": { protein: 2.5, fat: 0.3, carb: 28, cal: 130 },
    "Гречка вареная": { protein: 3.6, fat: 1.1, carb: 19.9, cal: 110 }
  },
  "Сладкое": {
    "Мёд": { protein: 0.3, fat: 0, carb: 82.4, cal: 329 }
  },
  "Фрукт": {
    "Банан (1 шт.)": { protein: 1.5, fat: 0.2, carb: 27, cal: 105, per: "unit" },
    "Апельсин": { protein: 1, fat: 0.2, carb: 15, cal: 62, per: "unit" }
  },
  "Салат": {
    "Винегрет": { protein: 1.2, fat: 6.5, carb: 10.4, cal: 120 },
    "Жареные овощи": { protein: 1.1, fat: 5, carb: 6.2, cal: 80 }
  }
};

const MEAL_TIMES = [
  "Еда до обеда",
  "Обед",
  "Еда до ужина",
  "Ужин",
  "Еда после ужина"
];

export default function NutritionGrouped() {
  const [meals, setMeals] = useState(
    MEAL_TIMES.reduce((acc, meal) => {
      acc[meal] = [];
      return acc;
    }, {})
  );

  const [form, setForm] = useState({ category: "Протеин", product: "Говядина", amount: 100 });
  const [selectedMeal, setSelectedMeal] = useState(MEAL_TIMES[0]);

  const selected = DATA[form.category][form.product];
  const multiplier = selected?.per === "unit" ? form.amount : form.amount / 100;

  const macros = (product) => {
    const mult = product.per === "unit" ? product.amount : product.amount / 100;
    return {
      protein: +(product.protein * mult).toFixed(1),
      fat: +(product.fat * mult).toFixed(1),
      carb: +(product.carb * mult).toFixed(1),
      cal: +(product.cal * mult).toFixed(1)
    };
  };

  const totals = (list) => list.reduce((sum, item) => {
    const m = macros(item);
    return {
      protein: sum.protein + m.protein,
      fat: sum.fat + m.fat,
      carb: sum.carb + m.carb,
      cal: sum.cal + m.cal
    };
  }, { protein: 0, fat: 0, carb: 0, cal: 0 });

  const addToMeal = () => {
    const newItem = {
      ...DATA[form.category][form.product],
      name: form.product,
      per: selected.per,
      amount: form.amount
    };
    setMeals({ ...meals, [selectedMeal]: [...meals[selectedMeal], newItem] });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto grid gap-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">🍽️ Калькулятор Питания</h1>

      <Card>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
          <div>
            <Label>Приём пищи</Label>
            <Select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)} className="w-full">
              {MEAL_TIMES.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Категория</Label>
            <Select value={form.category} onChange={(e) => {
              const cat = e.target.value;
              const firstProduct = Object.keys(DATA[cat])[0];
              setForm({ ...form, category: cat, product: firstProduct });
            }} className="w-full">
              {Object.keys(DATA).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Продукт</Label>
            <Select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="w-full">
              {Object.keys(DATA[form.category]).map((prod) => (
                <option key={prod} value={prod}>{prod}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Количество ({selected?.per === "unit" ? "шт." : "г"})</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
            />
          </div>

          <div className="flex items-end">
            <button onClick={addToMeal} className="w-full bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition">+ Добавить</button>
          </div>
        </CardContent>
      </Card>

      {MEAL_TIMES.map((time) => {
        const items = meals[time];
        if (items.length === 0) return null;
        const t = totals(items);
        return (
          <Card key={time} className="bg-white shadow border border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">🍴 {time}</h2>
              <ul className="space-y-1 mb-2">
                {items.map((item, idx) => {
                  const m = macros(item);
                  return (
                    <li key={idx} className="text-sm text-gray-600">
                      • {item.name} — {item.amount}
                      {item.per === "unit" ? " шт." : " г"} →
                      {` ${m.protein} Б / ${m.fat} Ж / ${m.carb} У / ${m.cal} ккал`}
                    </li>
                  );
                })}
              </ul>
              <div className="text-green-700 font-semibold">
                ✅ Итог: {t.protein} Б / {t.fat} Ж / {t.carb} У / {t.cal} ккал
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
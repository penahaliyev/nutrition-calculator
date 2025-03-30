import React, { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

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

export default function NutritionCalculator() {
  const [category, setCategory] = useState("Протеин");
  const [product, setProduct] = useState("Говядина");
  const [amount, setAmount] = useState(100);

  const selected = DATA[category][product];
  const multiplier = selected?.per === "unit" ? amount : amount / 100;
  const protein = (selected.protein * multiplier).toFixed(1);
  const fat = (selected.fat * multiplier).toFixed(1);
  const carb = (selected.carb * multiplier).toFixed(1);
  const cal = (selected.cal * multiplier).toFixed(1);

  return (
    <div className="grid gap-6 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Калькулятор Питания</h1>
      <div className="grid gap-4">
        <div>
          <Label>Категория</Label>
          <Select value={category} onChange={(e) => {
            const val = e.target.value;
            setCategory(val);
            setProduct(Object.keys(DATA[val])[0]);
          }}>
            {Object.keys(DATA).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Продукт</Label>
          <Select value={product} onChange={(e) => setProduct(e.target.value)}>
            {Object.keys(DATA[category]).map((prod) => (
              <option key={prod} value={prod}>{prod}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Количество ({selected?.per === "unit" ? "шт." : "г"})</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <Card>
          <CardContent className="p-4 grid gap-2">
            <div><strong>Белки:</strong> {protein} г</div>
            <div><strong>Жиры:</strong> {fat} г</div>
            <div><strong>Углеводы:</strong> {carb} г</div>
            <div><strong>Калории:</strong> {cal} ккал</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
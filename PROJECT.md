# 🥗 Nutrition Calculator

## 📌 Описание проекта

Приложение для расчёта нутриентов (белки, жиры, углеводы, калории) с разбивкой по приёмам пищи. 
Основано на React + Tailwind CSS. Хостинг — Vercel. Хранилище кода — GitHub.

---

## 📁 Структура проекта

- `components/` – React-компоненты (включая NutritionGrouped.js и ui/)
- `pages/` – страницы Next.js (`index.js`, `_app.js`)
- `styles/globals.css` – глобальные стили Tailwind CSS
- `public/` – можно добавить картинки и фавиконки
- `README.md`, `PROJECT.md` – инструкция и документация

---

## 🚀 Как задеплоить проект

1. Загрузите файлы проекта в GitHub
2. Сделайте `Commit` + `Push`
3. Vercel сам создаст и задеплоит новую версию
4. Обновите ссылку Vercel в браузере (используйте `Ctrl+Shift+R`, чтобы сбросить кэш)

---

## ⚠️ Частые ошибки и их решения

### 🛑 Ошибка: `Can't resolve '@/styles/globals.css'`
**Причина:** используется alias `@`, который не настроен

✅ Решение: заменить на `../styles/globals.css` в `pages/_app.js`

---

### 🛑 Tailwind не применяется
**Причина:** либо не подключён `globals.css`, либо нет нужных директив

✅ Решение:
- Убедитесь, что в `globals.css` есть:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Проверьте импорт в `_app.js`:
  ```js
  import "../styles/globals.css";
  ```

---

## 🧠 Версии

- `v1.0` — MVP: базовая логика, функционал группировки
- `v1.1` — Красивый интерфейс на Tailwind, улучшенный UX
- `v1.2` — README и PROJECT.md, стабильный билд

---

## 🧩 Следующие шаги

- Добавить сброс / очистку списка
- Общий итог за день
- Авторизация и сохранение истории
- График по БЖУ

---

🔗 Сайт: `https://nutrition-calculator.vercel.app`  
👨‍💻 Автор: Эльнур Penahaliyev  
🗂 Репозиторий: GitHub → `penahaliyev/nutrition-calculator`
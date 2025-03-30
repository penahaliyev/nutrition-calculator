# Nutrition Calculator — Документация

## 📌 Основные правила

- Всегда используйте относительные пути (например, `../styles/globals.css`) вместо alias `@`, если не настроен `jsconfig.json`
- После `Push` в GitHub Vercel запускает деплой автоматически — нажимать "Redeploy" не нужно, если нет ошибок

## 🐞 Типичные ошибки и их решения

### 1. Module not found: Can't resolve '@/styles/globals.css'
**Проблема:** Vercel не понимает alias `@`  
**Решение:** заменить путь на `../styles/globals.css`

### 2. Ошибка стилей (страница без оформления)
**Проблема:** Tailwind не подключен  
**Решение:** убедитесь, что:
- В `pages/_app.js` есть `import "../styles/globals.css"`
- В `globals.css` присутствует `@tailwind base; @tailwind components; @tailwind utilities;`

### 3. Ошибка сборки на Vercel
**Проблема:** Пропущен файл или конфликт версий  
**Решение:** перепроверьте структуру проекта и повторно сделайте push

---

## ✅ Структура проекта

- `pages/` — страницы сайта
- `components/` — компоненты React
- `styles/globals.css` — Tailwind стили
- `package.json` — зависимости и скрипты
- `README.md` — этот файл

---

## 📦 Как задеплоить

1. Скопируйте содержимое архива в папку репозитория
2. Сделайте `Commit` + `Push origin` через GitHub Desktop
3. Vercel сам всё задеплоит
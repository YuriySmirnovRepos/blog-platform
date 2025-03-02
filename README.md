# 📝 Blog Platform

![Blog Platform](https://img.shields.io/badge/Blog%20Platform-v1.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.5.0-764ABC?logo=redux)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)

## 🌐 Демо

[Открыть Blog Platform на Vercel](https://blog-platform-lilac-two.vercel.app/)

## 🛠️ Технологический стек

### Frontend
- **React 18** — библиотека для создания пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript для повышения надежности кода
- **Redux Toolkit** — управление состоянием приложения
- **RTK Query** — работа с API и кэширование данных
- **React Router DOM** — маршрутизация в приложении
- **React Hook Form** — управление формами с валидацией
- **SCSS Modules** — стилизация компонентов

### Сборка и разработка
- **Vite** — быстрый инструмент сборки
- **ESLint** — статический анализ кода
- **Prettier** — форматирование кода

### Архитектура
- **Feature-Sliced Design (FSD)** — архитектурная методология для организации кода

## 🏗️ Архитектура проекта (FSD)

Проект организован согласно методологии Feature-Sliced Design:

```
src/
├── app/           # Инициализация приложения, провайдеры, глобальные стили
├── pages/         # Композиция виджетов и фичей для конкретных страниц
├── widgets/       # Композиционные блоки для страниц (ArticleCard, UserMenu)
├── features/      # Бизнес-функциональность (CreateArticle, Auth, Like)
├── entities/      # Бизнес-сущности (Article, User)
└── shared/        # Переиспользуемые ресурсы (UI, lib, api)
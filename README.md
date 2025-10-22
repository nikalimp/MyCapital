# MyCapital

Cross-platform mobile app prototype for tracking personal assets. Built with Expo and React Native to mirror the provided design screens.

## Getting started

1. Install dependencies (Node.js 18+ recommended):
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm start
   ```
   Use the prompts to open the app on iOS, Android, or the web.

## Features

- Home dashboard with total balance summary and categorized asset list.
- Settings screen for adjusting interface language and default currency.
- Guided asset creation flow with category selection and rich form inputs.
- Asset detail screen with quick edit controls for balance, date, and notes.
- Shared component library to keep UI consistent across screens.

## Project structure

```
.
├── App.tsx
├── app.json
├── assets/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── state/
│   ├── types/
│   └── utils/
└── tsconfig.json
```

The state folder contains lightweight context providers that mimic persistent storage for demonstration purposes.

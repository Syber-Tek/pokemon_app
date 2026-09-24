# Uniwind Installation & Setup Guide for Expo (Tailwind CSS v4)

A complete, step-by-step guide to installing and configuring **Uniwind** — the high-performance Tailwind CSS v4 styling engine for React Native and Expo.

---

## 📋 Prerequisites & Requirements

- **Expo SDK**: 50+ (Works with Expo Router)
- **Tailwind CSS**: `v4.x` (Uniwind only supports Tailwind CSS v4)
- **Node package manager**: `bun`, `npm`, `yarn`, or `pnpm`

---

## 🛠️ Step-by-Step Installation

### Step 1: Install Dependencies

Run the following command to install Uniwind, Tailwind CSS, and required peer dependencies:

```bash
npx expo install uniwind tailwindcss react-native-reanimated react-native-safe-area-context
```

*Or with Bun / NPM:*
```bash
bun add uniwind tailwindcss
# OR
npm install uniwind tailwindcss
```

---

### Step 2: Create the Global CSS Entry File

Create a `global.css` file inside your `src/` directory (`src/global.css`).

```css
/* src/global.css */
@import 'tailwindcss';
@import 'uniwind';
```

> **📌 Note on File Location:**
> Keeping `global.css` inside `src/global.css` ensures Tailwind automatically scans all files and components in your `src/` directory for class names.

---

### Step 3: Configure `metro.config.js`

If you don't already have a `metro.config.js` file, generate one using Expo CLI:
```bash
npx expo customize metro.config.js
```

Update your `metro.config.js` to wrap your Metro configuration with `withUniwindConfig`:

```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  // Relative path to your CSS entry file
  cssEntryFile: './src/global.css',
  // Path for auto-generated TypeScript definitions
  dtsFile: './src/uniwind-types.d.ts',
});
```

> **⚠️ Important:** `withUniwindConfig` must be the **outermost wrapper** in your `metro.config.js` if you are using other Metro wrappers.

---

### Step 4: Import CSS in Expo Router Root Layout

Import `global.css` inside your root layout file (`src/app/_layout.tsx`).

```tsx
// src/app/_layout.tsx
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

> **🚨 Warning:** Do **NOT** import `global.css` inside the entry point (`index.js` or `index.ts` where `registerRootComponent` is called), as changes will trigger full reloads instead of fast refresh.

---

### Step 5: Configure TypeScript Support

To enable autocompletion and prevent TypeScript errors for `className` props on React Native built-in components (`View`, `Text`, etc.):

1. Create a `uniwind-env.d.ts` file in your project root:

```typescript
/// <reference types="uniwind/types" />
```

2. Ensure `uniwind-env.d.ts` is listed in your `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "uniwind-env.d.ts"
  ]
}
```

---

### Step 6: (Optional) Enable VSCode / Cursor Tailwind IntelliSense

To get class name autocompletion in VSCode, Cursor, or Windsurf:

1. Open or create `.vscode/settings.json`.
2. Add the following configuration:

```json
{
  "tailwindCSS.classAttributes": [
    "class",
    "className",
    "headerClassName",
    "contentContainerClassName",
    "columnWrapperClassName",
    "imageClassName",
    "tintColorClassName"
  ],
  "tailwindCSS.classFunctions": [
    "useResolveClassNames"
  ]
}
```

---

## 🎨 Usage Example

Now you can use standard Tailwind CSS classes directly on standard React Native components:

```tsx
// src/app/index.tsx
import { Text, View, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-6">
      <Text className="text-2xl font-bold text-sky-400 mb-4">
        Hello Uniwind & Tailwind v4!
      </Text>
      
      <Pressable className="bg-sky-500 active:bg-sky-600 px-6 py-3 rounded-xl shadow-lg">
        <Text className="text-white font-semibold text-lg">
          Click Me
        </Text>
      </Pressable>
    </View>
  );
}
```

---

## ❓ Troubleshooting & FAQs

### 1. `Error: Failed to get the SHA-1 for: .../src/global.css`
- **Cause:** Metro bundler is running with a stale cache from before `metro.config.js` or `global.css` was added.
- **Solution:** Stop Metro (`Ctrl + C`) and start with cache cleared:
  ```bash
  npx expo start -c
  ```

### 2. TypeScript complains `Property 'className' does not exist`
- **Solution:** Ensure `uniwind-env.d.ts` exists at the root with `/// <reference types="uniwind/types" />` and is included in `tsconfig.json`. Restart your editor's TypeScript server if needed.

### 3. Styles aren't updating when editing `global.css`
- **Solution:** Restart Metro bundler (`npx expo start -c`) whenever you edit `metro.config.js` or structural CSS configuration.

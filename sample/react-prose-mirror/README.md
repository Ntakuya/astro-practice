# 下準備

```terminal
% pnpm init
% pnpm create vite
✔ Project name: … prose-mirror-react
✔ Select a framework: › React
✔ Select a variant: › TypeScript
% tree -L 3
.
├── index.html
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

```terminal
% touch pnpm-workspace.yaml
```

```pnpm-workspace.yaml
packages:
    - "prose-mirrow-react/**"
```

```package.json
"scripts": {
    "dev": "pnpm  --parallel --filter \"./**\" dev"
  },
```

```terminal
% pnpm install
% pnpm dev
```

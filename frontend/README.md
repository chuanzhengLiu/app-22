# ModernAstro Website 官网

ModernAstro 是一个基于 **Astro**、**React** 和 **TypeScript** 构建的高性能现代化静态网站（SSG）。项目采用前沿的 UI 设计语言，融合了玻璃拟态、渐变光效与流畅的交互动画，旨在提供极致的用户体验。

## ✨ 核心特性

- **🚀 极致性能**：基于 Astro 的静态站点生成 (SSG) 技术，零 JavaScript 运行时开销（除了必要的交互组件）。
- **🎨 现代设计**：
  - **深色模式风格**：以深空蓝 (`#0f172a`) 为主色调，搭配活力蓝 (`#3b82f6`) 点缀。
  - **高级视觉效果**：内置玻璃拟态 (Glassmorphism)、动态呼吸光斑、网格背景与悬浮微交互。
  - **完全响应式**：完美适配移动端 (<767px)、平板与桌面大屏设备。
- **🌍 国际化支持 (i18n)**：
  - 内置中文（默认）与英文双语支持。
  - 基于路由的语言切换 (`/` vs `/en`)。
  - 自动识别并切换 Header 与 Footer 内容。
- **🧩 组件化架构**：
  - 混合使用 Astro 组件（静态内容）与 React 组件（交互逻辑）。
  - 封装了通用的 `Header`, `Footer`, `Hero`, `ContactForm` 等业务组件。
  - 统一的 Less 变量管理设计系统 (Design Tokens)。

## 🛠️ 技术栈

- **核心框架**: [Astro](https://astro.build/)
- **UI 库**: [React](https://react.dev/)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式预处理**: [Less](https://lesscss.org/)
- **包管理**: NPM

## 📂 目录结构

```text
├── src/
│   ├── components/      # 可复用组件 (Astro & React)
│   │   ├── Footer/      # 底部栏组件
│   │   ├── Form/        # 表单组件 (React)
│   │   ├── Header/      # 顶部导航与语言切换
│   │   └── Home/        # 首页相关组件 (Hero, Features)
│   ├── layouts/         # 全局页面布局
│   ├── pages/           # 页面路由 (支持文件系统路由)
│   │   ├── en/          # 英文版页面
│   │   └── ...          # 中文版页面 (根目录)
│   ├── styles/          # 全局样式与变量
│   │   ├── global.less  # 全局重置与基础样式
│   │   └── variables.less # 设计变量 (颜色, 断点, Mixins)
│   └── env.d.ts         # 类型定义
├── astro.config.mjs     # Astro 配置文件
├── package.json         # 项目依赖与脚本
└── tsconfig.json        # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js v18.14.1 或更高版本
- npm (随 Node.js 安装)

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 `http://localhost:3000` 即可预览项目。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 本地预览构建产物

```bash
npm run preview
```

## 🧞 命令说明

| 命令 | 说明 |
| :--- | :--- |
| `npm run dev` | 启动本地开发服务器，支持热更新 (HMR)。 |
| `npm run build` | 将项目构建为静态文件，用于生产环境部署。 |
| `npm run preview` | 在本地预览 `dist/` 目录下的构建产物。 |
| `npm run astro` | 运行 Astro CLI 命令 (如 `astro check`, `astro add` 等)。 |

## 🔧 配置指南

### 样式定制
所有全局设计变量均定义在 `src/styles/variables.less` 中。您可以轻松修改以下内容来定制品牌风格：
- `@primary-color`: 主色调
- `@accent-color`: 强调色
- `@radius-*`: 圆角大小
- `@mobile-max`: 响应式断点

### 国际化扩展
如需添加更多语言：
1. 在 `astro.config.mjs` 的 `i18n` 配置中添加新的 locale。
2. 在 `src/pages/` 下创建对应的语言目录。
3. 更新 `src/components/Header/Header.astro` 和 `Footer.astro` 中的文本映射。

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

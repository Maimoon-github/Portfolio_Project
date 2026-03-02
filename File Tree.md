# File Tree: Portfolio_Project

**Root Path:** `c:\Users\Aurum\vscode\Portfolio_Project`

```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ deploy.yml
├── 📁 specialist-portfolio
│   ├── 📁 design
│   │   ├── 📁 Figma
│   │   │   ├── 📄 00_DesignSystem.fig
│   │   │   ├── 📄 01_UI-Kit.fig
│   │   │   ├── 📄 02_Wireframes.fig
│   │   │   ├── 📄 03_HighFidelity.fig
│   │   │   ├── 📄 04_Prototype.fig
│   │   │   └── 📄 05_DevHandoff.fig
│   │   └── 📁 exports
│   │       ├── 📁 tokens
│   │       │   ├── ⚙️ colors.json
│   │       │   ├── ⚙️ shadows.json
│   │       │   ├── ⚙️ spacing.json
│   │       │   └── ⚙️ typography.json
│   │       └── 🎨 css-variables.css
│   ├── 📁 docs
│   │   ├── 📁 architecture
│   │   │   └── 📝 overview.md
│   │   ├── 📁 handoff
│   │   │   ├── 📝 component-specs.md
│   │   │   ├── 📝 css-variables.md
│   │   │   ├── 📝 html-snippets.md
│   │   │   └── 📝 json-schemas.md
│   │   └── 📝 seo-strategy.md
│   ├── 📁 e2e
│   │   ├── 📁 specs
│   │   │   ├── 📄 contact-form.spec.ts
│   │   │   ├── 📄 navigation.spec.ts
│   │   │   └── 📄 project-filtering.spec.ts
│   │   └── 📄 playwright.config.ts
│   ├── 📁 public
│   │   ├── 📄 favicon.ico
│   │   ├── 🌐 index.html
│   │   ├── ⚙️ manifest.json
│   │   ├── 📄 robots.txt
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   ├── 📁 fonts
│   │   │   │   ├── 📁 Inter
│   │   │   │   └── 📁 JetBrainsMono
│   │   │   ├── 📁 icons
│   │   │   │   ├── 📁 social
│   │   │   │   └── 📁 ui
│   │   │   ├── 📁 images
│   │   │   │   ├── 📁 og
│   │   │   │   └── 📁 projects
│   │   │   └── 🖼️ react.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 layout
│   │   │   │   ├── 📄 Header.tsx
│   │   │   │   ├── 📄 Layout.tsx
│   │   │   │   ├── 📄 PageWrapper.tsx
│   │   │   │   ├── 📄 SectionContainer.tsx
│   │   │   │   └── 🎨 layout.module.css
│   │   │   └── 📁 ui
│   │   │       ├── 📁 Badge
│   │   │       │   ├── 🎨 Badge.module.css
│   │   │       │   ├── 📄 Badge.tsx
│   │   │       │   ├── 📄 Badge.types.ts
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 Button
│   │   │       │   ├── 🎨 Button.module.css
│   │   │       │   ├── 📄 Button.test.tsx
│   │   │       │   ├── 📄 Button.tsx
│   │   │       │   ├── 📄 Button.types.ts
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 Card
│   │   │       │   ├── 🎨 Card.module.css
│   │   │       │   ├── 📄 Card.tsx
│   │   │       │   ├── 📄 Card.types.ts
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 DataTable
│   │   │       │   ├── 🎨 DataTable.module.css
│   │   │       │   ├── 📄 DataTable.tsx
│   │   │       │   ├── 📄 DataTable.types.ts
│   │   │       │   ├── 📄 TableHeader.tsx
│   │   │       │   ├── 📄 TableRow.tsx
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 FilterBar
│   │   │       │   ├── 🎨 FilterBar.module.css
│   │   │       │   ├── 📄 FilterBar.tsx
│   │   │       │   ├── 📄 FilterBar.types.ts
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 Footer
│   │   │       │   ├── 🎨 Footer.module.css
│   │   │       │   ├── 📄 Footer.tsx
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 FormInput
│   │   │       │   ├── 🎨 Input.module.css
│   │   │       │   ├── 📄 Input.tsx
│   │   │       │   ├── 📄 Input.types.ts
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 HeroKPIStrip
│   │   │       │   ├── 🎨 HeroKPIStrip.module.css
│   │   │       │   ├── 📄 HeroKPIStrip.tsx
│   │   │       │   ├── 📄 KPICard.tsx
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 Navigation
│   │   │       │   ├── 📄 DesktopNav.tsx
│   │   │       │   ├── 📄 MobileNav.tsx
│   │   │       │   ├── 🎨 Nav.module.css
│   │   │       │   ├── 📄 Nav.types.ts
│   │   │       │   ├── 📄 NavDropdown.tsx
│   │   │       │   ├── 📄 Navbar.tsx
│   │   │       │   └── 📄 index.ts
│   │   │       ├── 📁 ProjectCard
│   │   │       │   ├── 🎨 ProjectCard.module.css
│   │   │       │   ├── 📄 ProjectCard.test.tsx
│   │   │       │   ├── 📄 ProjectCard.tsx
│   │   │       │   ├── 📄 ProjectCard.types.ts
│   │   │       │   ├── 📄 ProjectCard.variants.ts
│   │   │       │   └── 📄 index.ts
│   │   │       └── 📁 ToolCard
│   │   │           ├── 🎨 ToolCard.module.css
│   │   │           ├── 📄 ToolCard.tsx
│   │   │           ├── 📄 ToolCard.types.ts
│   │   │           └── 📄 index.ts
│   │   ├── 📁 config
│   │   │   ├── 📄 navigation.ts
│   │   │   ├── 📄 routes.ts
│   │   │   └── 📄 seo.ts
│   │   ├── 📁 data
│   │   │   ├── 📁 schemas
│   │   │   │   ├── 📄 blog.schema.ts
│   │   │   │   ├── 📄 project.schema.ts
│   │   │   │   └── 📄 tool.schema.ts
│   │   │   ├── 📄 blog.ts
│   │   │   ├── 📄 projects.ts
│   │   │   ├── 📄 resume.ts
│   │   │   └── 📄 tools.ts
│   │   ├── 📁 hooks
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 useFilteredProjects.ts
│   │   │   ├── 📄 useReducedMotion.ts
│   │   │   ├── 📄 useScrollPosition.ts
│   │   │   └── 📄 useTheme.ts
│   │   ├── 📁 pages
│   │   │   ├── 📁 About
│   │   │   │   ├── 🎨 About.module.css
│   │   │   │   ├── 📄 About.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Blog
│   │   │   │   ├── 🎨 Blog.module.css
│   │   │   │   ├── 📄 Blog.tsx
│   │   │   │   ├── 📄 Blog.types.ts
│   │   │   │   ├── 📄 BlogPost.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Contact
│   │   │   │   ├── 🎨 Contact.module.css
│   │   │   │   ├── 📄 Contact.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Documentation
│   │   │   │   ├── 🎨 Documentation.module.css
│   │   │   │   ├── 📄 Documentation.tsx
│   │   │   │   ├── 📄 TutorialTemplate.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Home
│   │   │   │   ├── 📁 sections
│   │   │   │   │   ├── 📄 ContactCTASection.tsx
│   │   │   │   │   ├── 📄 FeaturedProjectsSection.tsx
│   │   │   │   │   ├── 📄 HeroSection.tsx
│   │   │   │   │   ├── 📄 LatestLabSection.tsx
│   │   │   │   │   ├── 📄 ManifestoSection.tsx
│   │   │   │   │   ├── 🎨 Section.module.css
│   │   │   │   │   └── 📄 StackSnapshotSection.tsx
│   │   │   │   ├── 🎨 Home.module.css
│   │   │   │   ├── 📄 Home.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Portfolio
│   │   │   │   ├── 🎨 Portfolio.module.css
│   │   │   │   ├── 📄 Portfolio.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 ProjectDetail
│   │   │   │   ├── 🎨 ProjectDetail.module.css
│   │   │   │   ├── 📄 ProjectDetail.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Projects
│   │   │   │   ├── 🎨 Projects.module.css
│   │   │   │   ├── 📄 Projects.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 Resume
│   │   │   │   ├── 🎨 Resume.module.css
│   │   │   │   ├── 📄 Resume.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   └── 📁 Tools
│   │   │       ├── 📄 ListofTools.tsx
│   │   │       ├── 🎨 Tools.module.css
│   │   │       ├── 📄 Tools.tsx
│   │   │       └── 📄 index.ts
│   │   ├── 📁 services
│   │   │   ├── 📄 analytics.service.ts
│   │   │   ├── 📄 contact.service.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 styles
│   │   │   ├── 📁 themes
│   │   │   │   └── 🎨 dark.css
│   │   │   ├── 🎨 animations.css
│   │   │   ├── 🎨 globals.css
│   │   │   ├── 🎨 tokens.css
│   │   │   ├── 🎨 typography.css
│   │   │   └── 🎨 variables.css
│   │   ├── 📁 tests
│   │   │   ├── 📁 __mocks__
│   │   │   │   └── 📄 fileMock.ts
│   │   │   ├── 📁 integration
│   │   │   ├── 📁 unit
│   │   │   └── 📄 setup.ts
│   │   ├── 📁 types
│   │   │   ├── 📄 blog.types.ts
│   │   │   ├── 📄 common.types.ts
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 navigation.types.ts
│   │   │   ├── 📄 project.types.ts
│   │   │   ├── 📄 resume.types.ts
│   │   │   └── 📄 tool.types.ts
│   │   ├── 📁 utils
│   │   │   ├── 📄 animations.ts
│   │   │   ├── 📄 cn.ts
│   │   │   ├── 📄 constants.ts
│   │   │   ├── 📄 formatNumber.ts
│   │   │   └── 📄 index.ts
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   ├── 📄 main.tsx
│   │   └── 📄 vite-env.d.ts
│   ├── ⚙️ .env.eample
│   ├── ⚙️ .eslintrc.cjs
│   ├── ⚙️ .gitignore
│   ├── ⚙️ .prettierignore
│   ├── ⚙️ .prettierrc
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   ├── 📄 vite.config.ts
│   └── 📄 vitest.config.ts
└── 📝 react-ts-project-structure-ME.md
```
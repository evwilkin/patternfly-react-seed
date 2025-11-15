# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PatternFly Seed is a scaffolding utility for building web applications with PatternFly v6. It provides a pre-configured React + TypeScript setup with webpack, routing, testing infrastructure, and a complete application layout using the PatternFly Compass design system.

## Essential Commands

### Development
```bash
npm install              # Install dependencies
npm run start:dev        # Start development server (http://localhost:8080)
npm run type-check       # Run TypeScript type checking
```

### Testing
```bash
npm run test             # Run Jest test suite
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

### Building & Production
```bash
npm run build            # Production build (outputs to dist/)
npm run start            # Serve production build (requires build first)
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run ci-checks        # Run all CI checks (type-check + lint + test:coverage)
```

### Bundle Analysis
```bash
npm run bundle-profile:analyze  # Analyze bundle size
```

## Architecture

### Application Structure

The app uses a **Compass-based layout** (PatternFly's AI-enhanced design system):

- **Main entry**: `src/index.tsx` → `src/app/index.tsx`
- **Root component**: `src/app/index.tsx` wraps the app with:
  - `ThemeProvider` for dark/light theme management
  - `Router` for routing
  - `AppLayout` which implements the Compass layout

### Compass Layout Components

The app uses PatternFly's **Compass** component system (imported from `@patternfly/react-core`):

- `<Compass>` - Main container with glass theme support (`pf-v6-theme-glass`)
- `<CompassHeader>` - Top navigation with logo, tabs, and user profile
- `<CompassPanel>` - Reusable panels with `isPill`, `hasNoPadding`, `isScrollable` variants
- `<CompassContent>` - Main content wrapper
- `<CompassMainHeader>` - Page title and toolbar
- `<CompassMessageBar>` - Footer with AI chatbot integration (from `@patternfly/chatbot`)

### Routing Architecture

Routes are defined in `src/app/routes.tsx` using a typed config system:

```typescript
interface IAppRoute {
  label?: string;    // Shown in nav (omit to hide from sidebar)
  element: React.ReactElement;
  path: string;
  title: string;     // Used for page title
}

interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}
```

**Navigation synchronization**: Routes automatically sync with Compass tabs in `AppLayout.tsx`:
- Tab selection updates route via `navigate()`
- Route changes update active tab via `useEffect`
- Supports nested sub-tabs (e.g., Settings → General/Profile)

### Theme Management

Two theme systems work together:

1. **Glass Theme** (`pf-v6-theme-glass`):
   - Applied at document root in `src/app/index.tsx`
   - Provides glassmorphic UI effects
   - Always enabled for this app

2. **Dark/Light Theme** (`pf-v6-theme-dark`):
   - Managed by `src/app/utils/ThemeContext.tsx`
   - Stored in localStorage (`pf-theme`)
   - Respects system preference on first load
   - Toggle via `useTheme()` hook

### Path Aliases

TypeScript and webpack are configured with these aliases:

- `@app/*` → `src/app/*` - Application code
- `@assets/*` → `node_modules/@patternfly/react-core/dist/styles/assets/*` - PatternFly assets

**Usage examples**:
```typescript
import { Dashboard } from '@app/Dashboard/Dashboard';
import imgSrc from '@assets/images/g_sizing.png';
```

### Static Assets

**SVG handling** (configured in `webpack.common.js`):
- SVGs in `/bgimages/` directories → inlined as data URLs (for CSS backgrounds)
- Other SVGs → loaded as raw strings (for inline HTML)

**Image assets**:
```typescript
import logo from '@app/assets/images/logo.svg';  // Raw SVG string
<span dangerouslySetInnerHTML={{__html: logo}} />
```

### Testing Infrastructure

- **Framework**: Jest with ts-jest preset
- **Environment**: jest-fixed-jsdom (resolves JSDOM memory issues)
- **Testing Library**: @testing-library/react with user-event
- **Module resolution**: Configured to support `@app/*` aliases

### Documentation Sources

**CRITICAL**: This project requires referencing TWO documentation sources depending on the component type:

#### 1. PatternFly MCP Server (For Standard Components)

Use the PatternFly MCP server tools for ALL standard PatternFly components (Button, Card, Table, Alert, etc.):

- **Tools**: `mcp__patternfly-mcp__usePatternFlyDocs` and `mcp__patternfly-mcp__fetchDocs`
- **Coverage**: Design guidelines, accessibility docs, component API, usage examples
- **Components**: All PatternFly components EXCEPT Compass-related components

**Always query the MCP server** when working with:
- Form components (TextInput, Select, Checkbox, etc.)
- Data display (Table, DataList, etc.)
- Navigation (Nav, Tabs, Breadcrumb, etc.)
- Feedback (Alert, Modal, Toast, etc.)
- Charts and visualizations
- Any component from `@patternfly/react-core` that is NOT Compass-related

#### 2. Local Compass Source Code (For Compass Components)

**ALWAYS reference the local source code** at `node_modules/@patternfly/react-core/src/components/Compass/` for:

- `<Compass>` - Main container
- `<CompassHeader>` - Top navigation
- `<CompassPanel>` - Reusable panels
- `<CompassContent>` - Content wrapper
- `<CompassMainHeader>` - Page headers
- `<CompassMessageBar>` - Footer message bar
- `<CompassHero>` - Hero sections

**Why local source code?**
- Compass components are experimental/prerelease and may not be in PatternFly MCP docs
- Source code is the single source of truth for props, types, and implementation details
- Examples in `examples/` directory show real-world usage patterns
- Tests in `__tests__/` demonstrate proper component usage

**Key files**:
- `Compass.tsx` - Main component implementation and props
- `CompassHeader.tsx` - Header with tabs and user profile
- `CompassPanel.tsx` - Panel variants (`isPill`, `hasNoPadding`, `isScrollable`)
- `CompassMessageBar.tsx` - Chatbot integration
- `examples/CompassDemo.tsx` - Comprehensive usage example

#### AI Documentation Guidelines

The `ai-documentation/` directory contains comprehensive PatternFly development rules:

- **Always reference** `documentation/README.md` as the table of contents
- Enforces PatternFly v6 (`pf-v6-` class prefix)
- Covers component architecture, styling standards, accessibility
- Specialized guides for Charts, Chatbot, and data components
- See `.cursor/rules/patternfly-vibe-coding.mdc` for enforcement rule

**Key principles**:
- Component-first approach (use PatternFly components before custom solutions)
- Use utility classes over custom CSS
- Always implement loading/error/empty states
- Follow accessibility guidelines (proper ARIA labels, keyboard navigation)

### Build Configuration

**Webpack**:
- Common config: `webpack.common.js` (module loaders, plugins, path resolution)
- Dev config: `webpack.dev.js` (webpack-dev-server, HMR)
- Prod config: `webpack.prod.js` (minification, optimization)

**Environment variables**:
- Managed via `dotenv-webpack`
- Create `.env` file or use system environment variables
- Access via `process.env.ENV_NAME`

**Custom CSS paths**:
- Register third-party CSS directories in `stylePaths.js`
- Required to avoid webpack crawling entire node_modules

### Dependencies

**Core**:
- React 18
- PatternFly v6 (prerelease packages)
- `@patternfly/chatbot` for AI message bar
- React Router v7

**PatternFly packages** (all v6):
- `@patternfly/react-core` - Core components
- `@patternfly/react-icons` - Icon set
- `@patternfly/react-table` - Table components
- `@patternfly/react-code-editor` - Code editing
- `@patternfly/patternfly` - CSS framework

## Important Notes

### PatternFly Version

This project uses **PatternFly v6 prerelease** packages. Always use `pf-v6-` prefixed CSS classes and components from the v6 API.

### Compass Demo Reference

The file `src/app/compass-ui.tsx` is a **reference implementation** showing advanced Compass patterns:
- DataView table/card toggle
- Drawer integration
- Complex toolbar configurations
- MessageBar with AI indicators

**Not currently used** in the main app but serves as example code.

### Code Quality Tools

- **react-axe**: Accessibility compliance checking
- **webpack-bundle-analyzer**: Bundle size analysis
- **prettier**: Code formatting
- **eslint**: Code linting (TypeScript ESLint config)

### Module Type

This project uses ES modules (`"type": "module"` in package.json). Use ESM syntax (`import`/`export`) throughout.

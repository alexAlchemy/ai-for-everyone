# GitHub Copilot Instructions

## Project Overview

This is a **Nuxt 4 + Nuxt Content v3 + Docus** educational website for AI courses. The architecture separates content (markdown files) from presentation (Vue components), extending the [Docus](https://docus.dev/) documentation theme for structured course delivery.

## Key Architecture Patterns

### Content System (`@nuxt/content`)

- **Content storage**: All markdown files live in `content/` directory
- **Content querying**: Use `queryCollection('content')` API with chaining pattern:
  ```typescript
  await queryCollection('content').path(route.path).first()
  ```
- **Content config**: Defined in `content.config.ts` with collections using `defineCollection()`
- **Rendering**: Always use `<ContentRenderer :value="page" />` component to render queried content

### Routing & Pages

- **Catch-all route**: `app/pages/[...slug].vue` handles ALL page routes dynamically
- **Page pattern**: Query content by `route.path` → fetch page data → render with ContentRenderer
- **404 handling**: Explicitly check `if (!page.value)` and throw `createError({ statusCode: 404 })`
- **Root app**: `app/app.vue` only contains `<NuxtPage />` and `<NuxtRouteAnnouncer />` - no layout logic

### Component Integration

- **MDC syntax**: Embed Vue components in markdown using `::component-name` syntax:
  ```markdown
  ::alert{color="green"}
  Content here
  ::
  ```
- **Component location**: All components in `app/components/` are auto-imported in markdown
- **Props**: Pass via MDC attributes: `::alert{color="green"}` → `defineProps({ color })`
- **Example components**: 
  - [app/components/Alert.vue](app/components/Alert.vue) - styled content blocks with color prop
  - [app/components/Counter.vue](app/components/Counter.vue) - interactive stateful component

## Development Workflow

### Commands
```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run generate # Static site generation
npm run preview  # Preview production build locally
```

### TypeScript Configuration

- Uses Nuxt's generated TypeScript configs (`.nuxt/tsconfig.*.json`)
- Main `tsconfig.json` references generated configs - don't add compilation settings here
- Vue Composition API auto-imports (`ref`, `computed`, etc.) work without imports

## Project-Specific Conventions

1. **No traditional layouts**: The catch-all page pattern replaces typical Nuxt layouts
2. **Single content collection**: Everything uses the `'content'` collection name
3. **Path-based routing**: Content file paths directly map to URLs (e.g., `content/about.md` → `/about`)
4. **Component naming**: Use PascalCase for components, kebab-case in markdown MDC syntax
5. **No middleware/plugins**: This starter is minimal - add as needed for features

## Dependencies

- `@nuxt/content` v3.10.0 - Core content management
- `docus` v5.4.2 - Documentation theme providing layouts, navigation, and styling
- `better-sqlite3` v12.6.0 - Used by Nuxt Content for indexing
- `nuxt` v4.2.2 - Framework (note: Nuxt 4, not 3)

## Configuration Files

- **`nuxt.config.ts`**: Extends Docus theme (`extends: ['docus']`), registers Content module
- **`app.config.ts`**: Docus theme configuration (site title, description, socials, header, aside navigation, footer)
- **`content.config.ts`**: Content collections config - single 'content' collection for all markdown

## Content Structure

This is an educational site with a hierarchical course structure:

```
content/
├── index.md                    # Homepage
├── about.md                    # About page
└── courses/
    ├── index.md                # Course catalog page
    ├── ai-for-work/
    │   ├── index.md            # Course landing page
    │   ├── 01/
    │   │   ├── index.md        # Module landing
    │   │   ├── 01-introduction.md
    │   │   └── 02-capabilities.md
    │   └── 02/
    │       └── ...
    ├── ai-for-parents/
    └── ai-for-small-business/
```

**Pattern**: Courses use nested folders for modules/lessons. Each folder should have an `index.md` for navigation.

## When Adding Features

- **New pages**: Create markdown in `content/`, no route files needed
- **New components**: Add to `app/components/`, auto-available in markdown
- **Configuration**: Extend `nuxt.config.ts` for Nuxt modules, `content.config.ts` for content behavior
- **Theme config**: Modify `app.config.ts` for Docus settings (navigation, branding, footer)
- **Assets**: Place static files in `public/` directory
- **New courses**: Follow the hierarchical pattern (`courses/course-name/module-number/lesson.md`)

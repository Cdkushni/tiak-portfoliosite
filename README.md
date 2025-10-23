# Tia Ashley Kushniruk Portfolio

A modern, brutalist portfolio website built with Nuxt 3, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Content Management**: Decap CMS (formerly Netlify CMS) for easy content editing
- **Performance**: Optimized builds with Vite
- **Responsive**: Mobile-first design with brutalist aesthetics
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Accessibility**: WCAG compliant design patterns

## Tech Stack

- **Framework**: Nuxt 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Nuxt Content
- **State Management**: Pinia
- **CMS**: Decap CMS
- **Deployment**: Netlify

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run generate
```

The static files will be generated in the `dist/` directory.

## Content Management

### Adding Pages

Pages are automatically discovered and added to the navigation menu!

**Quick Method:**
```bash
npm run create-page <page-name> [title]
```

Example:
```bash
npm run create-page contact "Contact Me"
```

This creates a new page at `content/page/contact.md` that will automatically:
- Be accessible at `/contact`
- Appear in the navigation menu as "Contact Me"
- Be sorted alphabetically with other pages

**Manual Method:**
1. Create a new markdown file in `content/page/`
2. Add frontmatter with a `title` field
3. The page will automatically appear in the menu!

See [PAGES_WORKFLOW.md](PAGES_WORKFLOW.md) for detailed documentation.

### Blog Posts

See [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md) for managing blog posts.

### Admin Panel (Optional)

Access the admin panel at `/admin` to manage content through a GUI:

- **Blog Posts**: Create and edit blog posts with markdown
- **Pages**: Create static pages
- **Site Settings**: Configure site information and social links
- **Categories**: Manage blog categories and subcategories

## Deployment

This site is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Set build command: `npm run generate`
3. Set publish directory: `dist`
4. Deploy!

## Project Structure

```
├── assets/           # Global styles and assets
├── components/       # Vue components
├── content/          # Markdown content files
├── layouts/          # Page layouts
├── pages/           # File-based routing
├── public/          # Static assets
├── server/          # API routes
├── stores/          # Pinia stores
└── nuxt.config.ts   # Nuxt configuration
```

## Content Structure

- `content/blog/` - Blog posts (markdown)
- `content/page/` - Static pages (markdown)
- `content/setup/` - Site configuration (JSON)
- `content/subcategory/` - Blog subcategories (JSON)
- `content/category/` - Blog categories (JSON)

## Customization

### Styling

The site uses Tailwind CSS with custom brutalist components. Edit `assets/css/main.css` and `tailwind.config.js` to customize the design.

### Content Types

Add new content types by:
1. Creating new folders in `content/`
2. Adding corresponding collections in `public/admin/config.yml`
3. Creating page components in `pages/`

## License

MIT License - see LICENSE file for details.
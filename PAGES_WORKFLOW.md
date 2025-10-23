# Pages Management Workflow

This document explains how to add and manage static pages on your website.

## How It Works

Pages are automatically discovered and added to the navigation menu. The system:

1. Scans the `content/page/` directory for all markdown files
2. Reads the `title` from each page's frontmatter
3. Automatically generates menu items sorted alphabetically
4. Always includes "Home" as the first menu item

## Adding a New Page

### Step 1: Create the Markdown File

Create a new markdown file in the `content/page/` directory:

```bash
content/page/your-page-name.md
```

### Step 2: Add Frontmatter

At the top of your markdown file, add frontmatter with at least a `title`:

```markdown
---
title: Your Page Title
---

# Your Page Title

Your content goes here...
```

### Step 3: That's It!

The page will automatically:
- Be accessible at `/your-page-name`
- Appear in the navigation menu as "Your Page Title"
- Be sorted alphabetically with other pages

## Examples

### Example 1: Simple About Page

**File:** `content/page/about.md`

```markdown
---
title: About
---

# About Me

I am a filmmaker and researcher...
```

**Result:** Accessible at `/about` with menu item "About"

### Example 2: Contact Page

**File:** `content/page/contact.md`

```markdown
---
title: Contact
description: Get in touch with me
---

# Contact Me

Email: your@email.com
Phone: +1-234-567-8900
```

**Result:** Accessible at `/contact` with menu item "Contact"

### Example 3: Portfolio Page

**File:** `content/page/portfolio.md`

```markdown
---
title: Portfolio
thumbnail: /images/portfolio-cover.jpg
---

# My Portfolio

Here are some of my works...
```

**Result:** Accessible at `/portfolio` with menu item "Portfolio"

## Menu Ordering

Pages are sorted alphabetically by their title. If you want custom ordering, you can add a `menuOrder` field to the frontmatter (this would require a small code update).

## Hiding Pages from Menu

If you want to create a page that's accessible via URL but NOT in the menu, simply omit the `title` field or set it to an empty string. The page will still be accessible at its URL but won't appear in navigation.

## Nested Pages

You can create nested pages by using subdirectories:

```bash
content/page/about/team.md  -> Accessible at /about/team
content/page/projects/2024.md -> Accessible at /projects/2024
```

These will also automatically appear in the menu.

## Testing Locally

1. Create your new page markdown file
2. The dev server will automatically detect it
3. Refresh your browser to see the new menu item
4. Click the menu item to view your page

## Deployment

When you push your changes to GitHub:

1. The GitHub Action will run
2. The site will rebuild with your new page
3. The menu will automatically update
4. Your new page will be live

## Troubleshooting

### Page not appearing in menu?

- Check that the markdown file has a `title` field in the frontmatter
- Make sure the file is in the `content/page/` directory
- Try restarting the dev server

### Page shows 404?

- Check the file path matches the URL (e.g., `about.md` -> `/about`)
- Make sure the file has proper frontmatter with `---` delimiters
- Check for typos in the filename

### Menu order is wrong?

- Pages are sorted alphabetically by title
- To change the order, modify the page titles
- Or implement custom sorting (see Advanced section below)

## Advanced: Custom Menu Configuration

If you need more control over the menu (e.g., custom order, external links), you can modify `server/api/site-info.get.ts`. The current implementation prioritizes automatic discovery, but you can customize it to:

- Add external links
- Set custom order
- Group pages into categories
- Add icons or badges

## Page Frontmatter Options

```yaml
---
title: Required - Used for menu text and page title
description: Optional - Meta description for SEO
thumbnail: Optional - Featured image for the page
date: Optional - Publication date
---
```

## Best Practices

1. **Use descriptive titles** - These appear in the menu and browser tabs
2. **Keep filenames simple** - Use lowercase with hyphens (e.g., `about-me.md`)
3. **Add descriptions** - Helps with SEO
4. **Test locally first** - Always preview before pushing to production
5. **One page per topic** - Don't create too many top-level pages

## Content Organization

```
content/
├── page/           # Static pages (auto-discovered)
│   ├── about.md
│   ├── contact.md
│   └── portfolio.md
├── blog/           # Blog posts (date-sorted)
│   └── ...
└── setup/          # Site configuration
    └── info.json
```


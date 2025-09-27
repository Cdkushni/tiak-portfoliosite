# Content Management Workflow

## Adding New Blog Posts

When you add a new blog post to the website, you have several automated options:

### Method 1: Fully Automated (Recommended)

**If you have the GitHub Action set up** (see `.github/workflows/update-content.yml`):

1. **Add your new blog post** to the `content/blog/` directory
   - Use the format: `YYYY-MM-DD-post-title.md`
   - Include proper frontmatter with title, date, thumbnail, subcategory, and description

2. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Add new blog post: [post-title]"
   git push
   ```

3. **Done!** The GitHub Action will automatically:
   - Detect the new blog post
   - Update the content cache
   - Commit the updated cache file
   - Trigger Netlify deployment

### Method 2: Using the Update Script (Manual)

1. **Add your new blog post** to the `content/blog/` directory
   - Use the format: `YYYY-MM-DD-post-title.md`
   - Include proper frontmatter with title, date, thumbnail, subcategory, and description

2. **Update the content cache** by running:
   ```bash
   npm run update-content
   ```
   
   This script will:
   - Generate the site to create a new content cache
   - Copy the latest cache file to `public/content-cache.json`
   - Show you the latest blog posts

3. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Add new blog post: [post-title]"
   git push
   ```

4. **Deploy** - Netlify will automatically rebuild and deploy the updated site

### Method 2: Manual Update

If you prefer to do it manually:

1. **Add your new blog post** to the `content/blog/` directory

2. **Generate the site**:
   ```bash
   npm run generate
   ```

3. **Copy the latest cache file**:
   ```bash
   # Find the latest cache file in .output/public/api/_content/
   # Copy it to public/content-cache.json
   ```

4. **Commit and push** your changes

## Blog Post Format

Your blog posts should follow this format:

```markdown
---
title: Your Post Title
date: Day Month DDth, YYYY
thumbnail: /images/uploads/your-image.jpg
subcategory: FILM (or other category)
description: Brief description of your post
---

Your blog post content here...
```

## Setting Up GitHub Action (For Fully Automated Workflow)

To enable the fully automated workflow:

1. **Ensure the GitHub Action file exists** in `.github/workflows/update-content.yml`
2. **Push your changes** to your main branch
3. **Check GitHub Actions** tab in your repository to verify the workflow is set up

The GitHub Action will:
- Trigger automatically when you push changes to blog content
- Update the content cache
- Commit the changes back to your repository
- Trigger Netlify deployment

## Troubleshooting

### New post not showing up?

1. Check that the frontmatter is correct
2. Ensure the date format is readable (not just a timestamp)
3. Run `npm run update-content` to refresh the cache
4. Check the browser console for any errors
5. Verify the GitHub Action ran successfully (if using automated workflow)

### Images not displaying?

1. Make sure images are in the `public/images/uploads/` directory
2. Use the correct path format: `/images/uploads/filename.jpg`
3. Check that the file exists and has the right permissions

### GitHub Action not working?

1. Check that the workflow file exists in `.github/workflows/`
2. Verify you have push permissions to the repository
3. Check the GitHub Actions tab for error messages
4. Ensure the `GITHUB_TOKEN` has the necessary permissions

## Content Categories

Available subcategories:
- FILM
- TOURING
- RESEARCH-OTHER

You can add new categories by creating corresponding JSON files in `content/subcategory/`.

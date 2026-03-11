# DecapBridge Migration Guide

This guide will help you migrate from the deprecated Netlify Identity to DecapBridge for authentication in your Decap CMS admin panel.

## What Changed

- ✅ Removed Netlify Identity widget from all admin HTML files
- ✅ Removed Netlify Identity references from `app.html`
- ✅ Updated `config.yml` files to use DecapBridge backend structure
- ✅ Upgraded to Decap CMS v3.0.0 (from Netlify CMS v2.0.0)

## Step-by-Step Setup

### 1. Sign Up for DecapBridge

1. Go to [https://decapbridge.com](https://decapbridge.com)
2. Click "Create an account" and sign up
3. Complete your profile (profile picture, name are optional but will be used in commits)

### 2. Add Your Site to DecapBridge

1. In the DecapBridge dashboard, click "Add a site"
2. Fill in the form:
   - **Git provider**: Select GitHub or GitLab (whichever you use)
   - **Git repository**: Enter in format `org/repository` (e.g., `yourusername/tiak-portfoliosite`)
   - **Git access token**: 
     - **For GitHub**: Create a token at [https://github.com/settings/tokens](https://github.com/settings/tokens)
       - Needs `repo` scope (or fine-grained with Contents read/write access)
       - If using Editorial Workflow, also needs `pull_requests` scope
     - **For GitLab**: Create a token in your repository settings
       - Needs scopes: `api`, `read_api`, `read_repository`, `write_repository`
   - **Your Decap CMS login URL**: `https://your-site.netlify.app/admin/index.html`
     - Replace `your-site.netlify.app` with your actual Netlify domain
   - **Auth type**: 
     - **Classic**: Password-based login directly in CMS
     - **PKCE**: Enables SSO (Google/Microsoft login) - redirects to DecapBridge login page

3. Click "Create site"

### 3. Update Your Config Files

After creating your site, DecapBridge will provide you with a `config.yml` template. You need to:

1. Copy the `site_id` value from the DecapBridge dashboard
2. Update both config files:
   - `static/admin/config.yml`
   - `public/admin/config.yml`

Replace `YOUR_SITE_ID_FROM_DECAPBRIDGE` with your actual site ID from DecapBridge.

**Example:**
```yaml
backend:
  name: decapbridge
  site_id: abc123xyz789  # Your actual site ID from DecapBridge
  auth_type: classic
```

### 4. Deploy Your Changes

1. Commit and push your changes to your repository
2. Wait for Netlify to deploy
3. Once deployed, test the admin panel at `https://your-site.netlify.app/admin`

### 5. Invite Collaborators

1. In DecapBridge dashboard, go to your site
2. Click "Manage collaborators" tab
3. Enter email addresses and send invitations
4. Collaborators will receive an email to set up their account
5. They can choose to login with Google, Microsoft, or set a password

## Troubleshooting

### Admin page shows "No backend found"
- Make sure you've updated the `site_id` in both config files
- Verify the config files are in the correct location (`static/admin/config.yml` and `public/admin/config.yml`)
- Check that your site is properly registered in DecapBridge

### Can't login
- Verify your Decap CMS login URL in DecapBridge matches your actual site URL
- Make sure you're using Decap CMS v3.0.0 or higher (already updated in the HTML files)
- Check browser console for any errors

### Git access issues
- Verify your Git access token has the correct permissions
- For GitHub, ensure the token has `repo` scope
- For GitLab, ensure the token has all required scopes

## Benefits of DecapBridge

- ✅ No dependency on deprecated Netlify Identity
- ✅ Email-based invitations (no GitHub/GitLab account required)
- ✅ Multiple login options (Google, Microsoft, or password)
- ✅ Simple user management interface
- ✅ Free to use
- ✅ Designed specifically for Decap CMS

## Resources

- [DecapBridge Documentation](https://decapbridge.com/docs/introduction)
- [DecapBridge Getting Started](https://decapbridge.com/docs/getting-started)
- [Decap CMS Documentation](https://decapcms.org/docs/)

## Need Help?

- [DecapBridge Contact Form](https://decapbridge.com/contact)
- [Millisecond Studio Discord](https://discord.gg/millisecond-studio)

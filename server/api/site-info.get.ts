import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  try {
    // Import JSON files directly
    const info = await import('~/content/setup/info.json')
    const connect = await import('~/content/setup/connect.json')
    
    // Get all pages from content/page/ directory
    const pages = await serverQueryContent(event, 'page').find()
    
    // Build menu from pages - start with Home
    const menu = [
      {
        name: 'Home',
        link: '/'
      }
    ]
    
    // Add pages from content/page/ directory
    // Sort by title alphabetically
    const sortedPages = pages
      .filter((page: any) => page.title) // Only include pages with titles
      .sort((a: any, b: any) => (a.title || '').localeCompare(b.title || ''))
    
    for (const page of sortedPages) {
      // Extract the slug from the path (e.g., /page/about -> /about)
      const slug = page._path?.replace('/page', '') || ''
      
      menu.push({
        name: page.title,
        link: slug
      })
    }
    
    // Merge with any manually defined menu items from info.json
    // This allows manual overrides or additional external links
    const manualMenuItems = info.default?.menu?.filter((item: any) => 
      item.link === '/' || !menu.some((autoItem: any) => autoItem.link === item.link)
    ) || []
    
    return {
      info: {
        ...info.default,
        menu: menu // Use auto-generated menu
      },
      connectLinks: connect.default?.connectlinks || [],
      subcategories: [],
      categories: []
    }
  } catch (error) {
    console.error('Error loading site info:', error)
    return {
      info: null,
      connectLinks: [],
      subcategories: [],
      categories: []
    }
  }
})


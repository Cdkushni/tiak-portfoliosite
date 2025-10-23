<template>
  <div class="min-h-screen bg-white">
    <!-- Skip Navigation -->
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 brutalist-button text-sm"
    >
      Skip to main content
    </a>
    
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white brutalist-border-b-4">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="text-2xl font-bold text-brutalist-black">
            {{ siteStore.info?.sitename || 'Tia Ashley Kushniruk' }}
          </NuxtLink>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink 
              v-for="item in siteStore.info?.menu" 
              :key="item.name"
              :to="item.link"
              class="font-semibold uppercase tracking-wide hover:text-gray-600 transition-colors"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
          
          <!-- Mobile Menu Button - Only show if there are menu items -->
          <button 
            v-if="siteStore.info?.menu && siteStore.info.menu.length > 0"
            @click="siteStore.toggleMenu"
            class="md:hidden brutalist-button text-sm p-2 min-w-[60px] touch-manipulation"
            :aria-expanded="siteStore.menuIsActive"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span v-if="!siteStore.menuIsActive">Menu</span>
            <span v-else>Close</span>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div 
          v-if="siteStore.menuIsActive" 
          id="mobile-menu"
          class="md:hidden mt-4 pb-4 brutalist-border-b-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <NuxtLink 
            v-for="item in siteStore.info?.menu" 
            :key="item.name"
            :to="item.link"
            class="block py-2 font-semibold uppercase tracking-wide hover:text-gray-600 transition-colors"
            @click="siteStore.toggleMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main id="main-content" role="main">
      <slot />
    </main>

    <!-- Back to Top Button -->
    <BackToTop />

    <!-- Footer -->
    <footer class="bg-black text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Site Info -->
          <div>
            <h3 class="text-xl font-bold mb-4">{{ siteStore.info?.sitename }}</h3>
            <p class="text-gray-300">{{ siteStore.info?.sitedescription }}</p>
          </div>
          
          <!-- Connect Links -->
          <div v-if="siteStore.connectLinks.length > 0">
            <h3 class="text-xl font-bold mb-4">Connect</h3>
            <div class="space-y-3">
              <a 
                v-for="link in siteStore.connectLinks" 
                :key="link.name"
                :href="link.url.startsWith('mailto:') || link.url.startsWith('tel:') || link.url.startsWith('http') ? link.url : (link.url.startsWith('+') || /^\d/.test(link.url) ? `tel:${link.url}` : link.url)" 
                :target="link.url.startsWith('http') ? '_blank' : undefined"
                :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="group flex items-center gap-3 p-3 bg-gray-900 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <!-- Icon based on link type -->
                <span class="flex-shrink-0 w-6 h-6">
                  <!-- Email Icon -->
                  <svg v-if="link.url.startsWith('mailto:')" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <!-- Phone Icon -->
                  <svg v-else-if="link.url.startsWith('tel:') || link.url.startsWith('+') || link.name.toLowerCase().includes('phone')" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <!-- Generic Link Icon -->
                  <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                </span>
                
                <!-- Link Text with Arrow -->
                <span class="flex-1 font-semibold">
                  <span v-if="link.url.startsWith('mailto:')">
                    {{ link.url.replace('mailto:', '') }}
                  </span>
                  <span v-else-if="link.url.startsWith('tel:')">
                    {{ link.url.replace('tel:', '') }}
                  </span>
                  <span v-else-if="link.url.startsWith('+') || /^\d/.test(link.url)">
                    {{ link.url }}
                  </span>
                  <span v-else>
                    {{ link.name }}
                  </span>
                </span>
                
                <!-- Arrow Icon -->
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Categories -->
          <div v-if="siteStore.categories.length > 0">
            <h3 class="text-xl font-bold mb-4">Categories</h3>
            <ul class="space-y-2">
              <li v-for="category in siteStore.categories" :key="category.id">
                <NuxtLink 
                  :to="`/category/${category.id}`"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  {{ category.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} {{ siteStore.info?.sitename }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch site data - use different methods for dev vs production
const { data: siteData } = await useAsyncData('site-data', async () => {
  try {
    // In production (static), read from static JSON files
    // In dev, use the API endpoint
    if (process.dev) {
      try {
        const data = await $fetch('/api/site-info')
        return data
      } catch (err) {
        // Fallback to static files if API fails
        console.warn('API failed, falling back to static files')
      }
    }
    
    // Load static JSON files
    const info = await $fetch('/content/setup/info.json')
    const connect = await $fetch('/content/setup/connect.json')
    
    // Build menu from content cache in production
    let menu = info?.menu || []
    
    // If in production, build menu from pages in content cache
    if (!process.dev) {
      try {
        const contentCache = await $fetch('/content-cache.json')
        const pages = (contentCache.contents || contentCache)
          .filter((item: any) => item._path?.startsWith('/page/') && item.title)
          .sort((a: any, b: any) => (a.title || '').localeCompare(b.title || ''))
        
        menu = [
          { name: 'Home', link: '/' },
          ...pages.map((page: any) => ({
            name: page.title,
            link: page._path.replace('/page', '')
          }))
        ]
      } catch (err) {
        console.warn('Could not build menu from cache, using manual menu')
        menu = info?.menu || []
      }
    }
    
    return {
      info: {
        ...info,
        menu: menu
      },
      connectLinks: connect?.connectlinks || [],
      subcategories: [],
      categories: []
    }
  } catch (error) {
    console.error('Error fetching site data:', error)
    return {
      info: null,
      connectLinks: [],
      subcategories: [],
      categories: []
    }
  }
})

// Update store with fetched data
if (siteData.value) {
  siteStore.info = siteData.value.info
  siteStore.connectLinks = siteData.value.connectLinks
  siteStore.subcategories = siteData.value.subcategories
  siteStore.categories = siteData.value.categories
}
</script>
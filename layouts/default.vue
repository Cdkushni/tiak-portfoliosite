<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white brutalist-border-b-4">
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
          
          <!-- Mobile Menu Button -->
          <button 
            @click="siteStore.toggleMenu"
            class="md:hidden brutalist-button text-sm"
          >
            Menu
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div 
          v-if="siteStore.menuIsActive" 
          class="md:hidden mt-4 pb-4 brutalist-border-b-4"
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
    <main>
      <slot />
    </main>

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
            <ul class="space-y-2">
              <li v-for="link in siteStore.connectLinks" :key="link.name">
                <a 
                  :href="link.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  {{ link.name }}
                </a>
              </li>
            </ul>
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

// Fetch site data at build time
const { data: siteData } = await useAsyncData('site-data', async () => {
  try {
    // Read JSON files directly as static assets
    const infoData = await $fetch('/content/setup/info.json')
    const connectData = await $fetch('/content/setup/connect.json')
    
    // Read subcategory files
    const subcategoryFiles = ['film.json', 'research-other.json', 'touring.json']
    const subcategoriesData = await Promise.all(
      subcategoryFiles.map(async (file) => {
        try {
          return await $fetch(`/content/subcategory/${file}`)
        } catch {
          return null
        }
      })
    ).then(results => results.filter(Boolean))
    
    return {
      info: infoData,
      connectLinks: connectData?.connectlinks || [],
      subcategories: subcategoriesData || [],
      categories: [] // No categories for now
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
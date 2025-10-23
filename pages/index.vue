<template>
  <div>
    <!-- Hero Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center px-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brutalist-black mb-6 leading-tight">
            {{ siteStore.info?.sitename || 'Tia Ashley Kushniruk' }}
          </h1>
          <p class="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            {{ siteStore.info?.sitedescription || 'The Brutalist Home of Tia Ashley Kushniruk.' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Latest Work</h2>
        
        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
        
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600">Error loading posts: {{ error }}</p>
        </div>
        
        <div v-else class="grid-brutalist">
          <article 
            v-for="post in posts" 
            :key="post._path"
            class="brutalist-card group hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300 cursor-pointer"
          >
            <!-- Featured Image -->
            <div v-if="post.thumbnail" class="mb-4">
              <img 
                :src="getImagePath(post.thumbnail)" 
                :alt="post.title"
                class="w-full h-48 object-cover brutalist-border"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
            
            <!-- Content -->
            <div>
              <h3 class="text-lg sm:text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors leading-tight">
                <NuxtLink :to="post._path" class="hover:underline">
                  {{ post.title }}
                </NuxtLink>
              </h3>
              
              <div class="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <time :datetime="post.date">
                  {{ formatDate(post.date) }}
                </time>
                <span v-if="post.subcategory" class="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                  {{ post.subcategory }}
                </span>
              </div>
              
              <p v-if="post.description" class="text-gray-700 mb-4 line-clamp-3">
                {{ post.description }}
              </p>
              
              <NuxtLink 
                :to="post._path" 
                class="inline-block brutalist-button text-sm"
              >
                Read More
              </NuxtLink>
            </div>
          </article>
        </div>
        
        <!-- Pagination -->
        <div v-if="siteStore.pagination.active" class="mt-12 text-center">
          <nav class="flex justify-center items-center space-x-4">
            <button 
              v-if="siteStore.pagination.page > 1"
              @click="goToPage(siteStore.pagination.page - 1)"
              class="brutalist-button"
            >
              Previous
            </button>
            
            <span class="text-gray-600">
              Page {{ siteStore.pagination.page }} of {{ siteStore.pagination.totalPages }}
            </span>
            
            <button 
              v-if="siteStore.pagination.page < siteStore.pagination.totalPages"
              @click="goToPage(siteStore.pagination.page + 1)"
              class="brutalist-button"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

// Fetch blog posts - use different methods for dev vs production
const { data: posts, pending, error} = await useAsyncData('blog-posts', async () => {
  try {
    // In dev, use Nuxt Content API
    if (process.dev) {
      try {
        const blogPosts = await queryContent('blog')
          .sort({ _path: -1 })
          .limit(12)
          .find()
        return blogPosts
      } catch (err) {
        console.warn('Nuxt Content query failed, falling back to cache')
      }
    }
    
    // In production, use content cache
    const response = await $fetch('/content-cache.json')
    const contentCache = response.contents || response
    
    const blogPosts = contentCache
      .filter((item: any) => item._path?.startsWith('/blog/'))
      .sort((a: any, b: any) => b._path.localeCompare(a._path))
      .slice(0, 12)
    
    return blogPosts
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    return []
  }
})

// Pagination logic
const goToPage = (page: number) => {
  // Implement pagination logic here
  console.log('Go to page:', page)
}

// Format date helper
const formatDate = (date: string) => {
  // Handle different date formats
  if (!date) return 'No date'
  
  // If it's already a readable format, return as is
  if (date.includes('th') || date.includes('st') || date.includes('nd') || date.includes('rd')) {
    return date
  }
  
  // Try to parse as ISO date
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return date // Return original if can't parse
  }
  
  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Handle image errors
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// Get correct image path
const getImagePath = (thumbnail: string) => {
  if (!thumbnail) return ''
  
  // In development, static files are served from the public directory
  // Remove /static prefix and use direct path
  if (thumbnail.startsWith('/static/')) {
    return thumbnail.replace('/static/', '/')
  }
  
  // If it starts with /images, keep as is
  if (thumbnail.startsWith('/images/')) {
    return thumbnail
  }
  
  // If it's just a filename, add the images path
  if (!thumbnail.startsWith('/')) {
    return `/images/uploads/${thumbnail}`
  }
  
  return thumbnail
}

// Set page title
useHead({
  title: siteStore.info?.sitename || 'Tia Ashley Kushniruk',
  meta: [
    { name: 'description', content: siteStore.info?.sitedescription || 'The Brutalist Home of Tia Ashley Kushniruk.' }
  ]
})
</script>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, createError, useAsyncData, useHead } from '#imports'
import { useSiteStore } from '~/stores/site'

const route = useRoute()
const siteStore = useSiteStore()

// Fetch the page using Nuxt Content
const { data: page, pending, error } = await useAsyncData(`page-${route.params.slug}`, async () => {
  try {
    const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
    const currentPage = await queryContent('page', slug).findOne()
    
    if (!currentPage) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found'
      })
    }
    
    return currentPage
  } catch (err) {
    console.error('Error fetching page:', err)
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found'
    })
  }
})

// Format date helper
const formatDate = (date: string) => {
  if (!date) return ''
  
  // If it's already a readable format, return as is
  if (date.includes('th') || date.includes('st') || date.includes('nd') || date.includes('rd')) {
    return date
  }
  
  // Try to parse as ISO date
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return date
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
  
  if (thumbnail.startsWith('/static/')) {
    return thumbnail.replace('/static/', '/')
  }
  
  if (thumbnail.startsWith('/images/')) {
    return thumbnail
  }
  
  if (!thumbnail.startsWith('/')) {
    return `/images/uploads/${thumbnail}`
  }
  
  return thumbnail
}

// Set page title and meta
useHead(() => ({
  title: `${page.value?.title} | ${siteStore.info?.sitename}`,
  meta: [
    { name: 'description', content: page.value?.description || siteStore.info?.siteDescription }
  ]
}))
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <article v-if="page" class="max-w-4xl mx-auto brutalist-card">
      <!-- Featured Image -->
      <div v-if="page.thumbnail" class="mb-8">
        <img 
          :src="getImagePath(page.thumbnail)" 
          :alt="page.title"
          class="w-full h-64 object-cover brutalist-border"
          loading="eager"
          @error="handleImageError"
        />
      </div>
      
      <!-- Page Header -->
      <header class="mb-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-brutalist-black mb-4 leading-tight">
          {{ page.title }}
        </h1>
        
        <div v-if="page.date" class="flex items-center gap-4 mb-6 text-gray-600 flex-wrap">
          <time :datetime="page.date" class="text-lg">
            {{ formatDate(page.date) }}
          </time>
        </div>
      </header>
      
      <!-- Page Content -->
      <div class="prose prose-lg max-w-none">
        <ContentRenderer :value="page" />
      </div>
      
      <!-- Navigation -->
      <nav class="mt-12 pt-8 border-t border-gray-200">
        <div class="text-center">
          <NuxtLink 
            to="/" 
            class="brutalist-button text-sm"
          >
            ← Back to Home
          </NuxtLink>
        </div>
      </nav>
    </article>
    
    <div v-else-if="pending" class="text-center py-12">
      <p>Loading page...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error.statusMessage || 'Page not found' }}</p>
      <NuxtLink to="/" class="brutalist-button text-sm mt-4 inline-block">
        ← Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.prose {
  @apply text-gray-800;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  @apply font-bold text-brutalist-black mt-8 mb-4;
}

.prose :deep(h1) {
  @apply text-3xl;
}

.prose :deep(h2) {
  @apply text-2xl;
}

.prose :deep(h3) {
  @apply text-xl;
}

.prose :deep(p) {
  @apply mb-4 leading-relaxed;
}

.prose :deep(a) {
  @apply text-brutalist-black font-semibold underline hover:text-gray-600 transition-colors;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply ml-6 mb-4;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(strong) {
  @apply font-bold;
}

.prose :deep(em) {
  @apply italic;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-black pl-4 italic my-4;
}

.prose :deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}

.prose :deep(pre) {
  @apply bg-gray-100 p-4 rounded overflow-x-auto mb-4;
}

.prose :deep(img) {
  @apply brutalist-border my-4;
}

.prose :deep(hr) {
  @apply border-t-4 border-black my-8;
}
</style>


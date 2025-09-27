<template>
  <div>
    <div v-if="pending" class="container mx-auto px-4 py-16 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
    
    <div v-else-if="error" class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">Post Not Found</h1>
      <p class="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="brutalist-button">Go Home</NuxtLink>
    </div>
    
    <article v-else class="max-w-4xl mx-auto px-4 py-16">
      <!-- Featured Image -->
      <div v-if="post.thumbnail" class="mb-8">
        <img 
          :src="getImagePath(post.thumbnail)" 
          :alt="post.title"
          class="w-full h-96 object-cover brutalist-border"
          loading="lazy"
          @error="handleImageError"
        />
      </div>
      
      <!-- Post Header -->
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-brutalist-black mb-4">
          {{ post.title }}
        </h1>
        
        <div class="flex items-center gap-4 mb-6 text-gray-600">
          <time :datetime="post.date" class="text-lg">
            {{ formatDate(post.date) }}
          </time>
          <span v-if="post.subcategory" class="bg-black text-white px-3 py-1 text-sm font-bold uppercase">
            {{ post.subcategory }}
          </span>
        </div>
      </header>
      
      <!-- Post Content -->
      <div class="prose prose-lg max-w-none">
        <ContentRenderer :value="post" />
      </div>
      
      <!-- Navigation -->
      <nav class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <NuxtLink 
            to="/" 
            class="brutalist-button"
          >
            ← Back to Home
          </NuxtLink>
          
          <div class="flex gap-4">
            <button 
              @click="sharePost"
              class="brutalist-button hover:bg-gray-800 transition-colors"
              :disabled="!post || isSharing"
            >
              {{ isSharing ? 'Sharing...' : 'Share' }}
            </button>
          </div>
        </div>
      </nav>
    </article>
    
    <!-- Custom Share Sheet -->
    <div 
      v-if="showShareSheet" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showShareSheet = false"
    >
      <div 
        class="bg-white p-6 rounded-lg brutalist-border max-w-md w-full mx-4"
        @click.stop
      >
        <h3 class="text-xl font-bold mb-4 text-center">Share this post</h3>
        
        <div class="grid grid-cols-2 gap-3 mb-4">
          <!-- Twitter -->
          <button 
            @click="shareToTwitter"
            class="brutalist-button flex items-center justify-center gap-2 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Twitter
          </button>
          
          <!-- Facebook -->
          <button 
            @click="shareToFacebook"
            class="brutalist-button flex items-center justify-center gap-2 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
          
          <!-- LinkedIn -->
          <button 
            @click="shareToLinkedIn"
            class="brutalist-button flex items-center justify-center gap-2 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </button>
          
          <!-- Reddit -->
          <button 
            @click="shareToReddit"
            class="brutalist-button flex items-center justify-center gap-2 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.587.547a1.249 1.249 0 0 1 1.249-1.25z"/>
            </svg>
            Reddit
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <!-- Email -->
          <button 
            @click="shareViaEmail"
            class="brutalist-button flex items-center justify-center gap-2 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91L19.545 3.82h3.819c.904 0 1.636.732 1.636 1.636z"/>
            </svg>
            Email
          </button>
          
          <!-- Copy Link -->
          <button 
            @click="copyLink"
            class="brutalist-button flex items-center justify-center gap-2 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Copy Link
          </button>
        </div>
        
        <button 
          @click="showShareSheet = false"
          class="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
    
    <!-- Toast notification -->
    <div 
      v-if="shareMessage" 
      class="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded brutalist-border z-50"
    >
      {{ shareMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const siteStore = useSiteStore()

// Share state
const isSharing = ref(false)
const shareMessage = ref('')
const showShareSheet = ref(false)

// Fetch the blog post
const { data: post, pending, error } = await useAsyncData(`blog-${route.params.slug}`, async () => {
  try {
    // Get all blog posts from the static content cache
    let contentCache
    try {
      const response = await $fetch('/content-cache.json')
      contentCache = response.contents || response
    } catch (err) {
      console.error('Error fetching content cache:', err)
      throw createError({
        statusCode: 404,
        statusMessage: 'Content not found'
      })
    }
    
    // Find the specific post by path
    const foundPost = contentCache.find((item: any) => 
      item._path === `/blog/${route.params.slug}`
    )
    
    if (!foundPost) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }
    
    return foundPost
  } catch (err) {
    console.error('Error fetching blog post:', err)
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    })
  }
})

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

// Share functionality
const sharePost = async () => {
  if (!post.value) {
    console.error('Post not loaded yet')
    return
  }

  // Check if Web Share API is available AND we're on mobile/tablet
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  if (navigator.share && (isMobile || isTouch)) {
    isSharing.value = true
    try {
      await navigator.share({
        title: post.value.title || 'Check out this post',
        text: post.value.description || 'Read this interesting post',
        url: window.location.href
      })
      console.log('Post shared successfully')
      shareMessage.value = 'Post shared successfully!'
      setTimeout(() => shareMessage.value = '', 3000)
      return
    } catch (err) {
      console.log('Error sharing:', err)
      // If native share fails, fall back to custom share sheet
      showShareSheet.value = true
    } finally {
      isSharing.value = false
    }
  }
  
  // Desktop or fallback: Show custom share sheet
  showShareSheet.value = true
}

// Social media share functions
const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.value?.title || 'Check out this post')}&url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=550,height=420')
  showShareSheet.value = false
  shareMessage.value = 'Opened Twitter!'
  setTimeout(() => shareMessage.value = '', 3000)
}

const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=550,height=420')
  showShareSheet.value = false
  shareMessage.value = 'Opened Facebook!'
  setTimeout(() => shareMessage.value = '', 3000)
}

const shareToLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=550,height=420')
  showShareSheet.value = false
  shareMessage.value = 'Opened LinkedIn!'
  setTimeout(() => shareMessage.value = '', 3000)
}

const shareToReddit = () => {
  const url = `https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.value?.title || 'Check out this post')}`
  window.open(url, '_blank', 'width=550,height=420')
  showShareSheet.value = false
  shareMessage.value = 'Opened Reddit!'
  setTimeout(() => shareMessage.value = '', 3000)
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    shareMessage.value = 'Link copied to clipboard!'
    setTimeout(() => shareMessage.value = '', 3000)
  } catch (err) {
    console.error('Clipboard not available:', err)
    const url = prompt('Copy this link:', window.location.href)
    if (url) {
      shareMessage.value = 'Link copied!'
      setTimeout(() => shareMessage.value = '', 3000)
    }
  }
  showShareSheet.value = false
}

const shareViaEmail = () => {
  const subject = encodeURIComponent(post.value?.title || 'Check out this post')
  const body = encodeURIComponent(`I thought you might be interested in this: ${post.value?.title || 'Check out this post'}\n\n${window.location.href}`)
  const url = `mailto:?subject=${subject}&body=${body}`
  window.location.href = url
  showShareSheet.value = false
  shareMessage.value = 'Opened email client!'
  setTimeout(() => shareMessage.value = '', 3000)
}

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showShareSheet.value) {
    showShareSheet.value = false
  }
}

// Add keyboard event listener
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

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

// Set page title and meta
useHead(() => ({
  title: `${post.value?.title} | ${siteStore.info?.sitename}`,
  meta: [
    { name: 'description', content: post.value?.description || siteStore.info?.sitedescription },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description || siteStore.info?.sitedescription },
    { property: 'og:image', content: post.value?.thumbnail },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.value?.title },
    { name: 'twitter:description', content: post.value?.description || siteStore.info?.sitedescription },
    { name: 'twitter:image', content: post.value?.thumbnail }
  ]
}))

// Set current post in store
watchEffect(() => {
  if (post.value) {
    siteStore.setCurrentPost(post.value)
  }
})
</script>

<style>
.prose {
  @apply text-gray-800;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-black font-bold;
}

.prose h1 {
  @apply text-3xl;
}

.prose h2 {
  @apply text-2xl;
}

.prose h3 {
  @apply text-xl;
}

.prose a {
  @apply text-black font-semibold underline hover:no-underline;
}

.prose blockquote {
  @apply border-l-4 border-black pl-4 italic;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded brutalist-border;
}

.prose pre code {
  @apply bg-transparent p-0;
}
</style>

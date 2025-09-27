<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-8">Test Images</h1>
    
    <div class="space-y-8">
      <div>
        <h2 class="text-xl font-bold mb-4">Direct Image Test</h2>
        <img 
          src="/images/uploads/screen-shot-2021-04-02-at-2.00.35-pm.png" 
          alt="Test Image"
          class="w-64 h-48 object-cover brutalist-border"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <p class="text-sm text-gray-600 mt-2">Path: /images/uploads/screen-shot-2021-04-02-at-2.00.35-pm.png</p>
      </div>
      
      <div>
        <h2 class="text-xl font-bold mb-4">Another Test Image</h2>
        <img 
          src="/images/uploads/fluid310.jpg" 
          alt="Test Image 2"
          class="w-64 h-48 object-cover brutalist-border"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <p class="text-sm text-gray-600 mt-2">Path: /images/uploads/fluid310.jpg</p>
      </div>
      
      <div>
        <h2 class="text-xl font-bold mb-4">Image Status</h2>
        <p v-if="imageStatus" class="text-green-600">{{ imageStatus }}</p>
        <p v-if="imageError" class="text-red-600">{{ imageError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const imageStatus = ref('')
const imageError = ref('')

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  imageError.value = `Failed to load: ${img.src}`
  console.error('Image failed to load:', img.src)
}

const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  imageStatus.value = `Successfully loaded: ${img.src}`
  console.log('Image loaded successfully:', img.src)
}

// Set page title
useHead({
  title: 'Test Images'
})
</script>

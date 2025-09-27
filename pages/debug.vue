<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-8">Debug: Blog Posts</h1>
    
    <div v-if="pending" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
    
    <div v-else-if="error" class="text-red-600">
      <p>Error: {{ error }}</p>
    </div>
    
    <div v-else>
      <h2 class="text-2xl font-bold mb-4">All Blog Posts ({{ posts.length }})</h2>
      
      <div class="space-y-4">
        <div v-for="post in posts" :key="post._path" class="brutalist-card">
          <h3 class="text-xl font-bold">{{ post.title }}</h3>
          <p><strong>Path:</strong> {{ post._path }}</p>
          <p><strong>Date:</strong> {{ post.date }}</p>
          <p><strong>Thumbnail:</strong> {{ post.thumbnail }}</p>
          <p><strong>Subcategory:</strong> {{ post.subcategory }}</p>
          <p><strong>Created:</strong> {{ post.createdAt }}</p>
          <p><strong>Updated:</strong> {{ post.updatedAt }}</p>
          
          <div class="mt-4">
            <NuxtLink :to="post._path" class="brutalist-button text-sm">
              View Post
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Fetch all blog posts for debugging
const { data: posts, pending, error } = await useAsyncData('debug-posts', () => 
  queryContent('blog').find()
)

// Set page title
useHead({
  title: 'Debug - Blog Posts'
})
</script>

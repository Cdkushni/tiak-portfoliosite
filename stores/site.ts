import { defineStore } from 'pinia'

export interface SiteInfo {
  sitename: string
  sitedescription: string
  siteicon: string
  showmenu: boolean
  altlayout: boolean
  linkcolor: string
  menu: Array<{
    name: string
    position: string
    link: string
  }>
}

export interface ConnectLink {
  name: string
  url: string
}

export interface Subcategory {
  title: string
  position: string
  description?: string
  group: string
}

export interface Category {
  title: string
  position: string
  id: string
  description?: string
}

export const useSiteStore = defineStore('site', () => {
  // State
  const menuIsActive = ref(false)
  const info = ref<SiteInfo | null>(null)
  const connectLinks = ref<ConnectLink[]>([])
  const subcategories = ref<Subcategory[]>([])
  const categories = ref<Category[]>([])
  const currentPost = ref(null)
  const pagination = ref({
    active: false,
    page: 1,
    itemsOnPage: 0,
    totalItems: 0,
    totalPages: 0
  })

  // Actions
  const fetchSiteData = async () => {
    try {
      // Read data directly from content files instead of API routes
      const infoData = await queryContent('setup/info').findOne()
      const connectData = await queryContent('setup/connect').findOne()
      const subcategoriesData = await queryContent('subcategory').find()
      const categoriesData = await queryContent('category').find()
      
      info.value = infoData
      connectLinks.value = connectData?.connectlinks || []
      subcategories.value = subcategoriesData || []
      categories.value = categoriesData || []
    } catch (error) {
      console.error('Error fetching site data:', error)
    }
  }

  const toggleMenu = () => {
    menuIsActive.value = !menuIsActive.value
  }

  const setCurrentPost = (post: any) => {
    currentPost.value = post
  }

  const setPagination = (paginationData: typeof pagination.value) => {
    pagination.value = paginationData
  }

  return {
    // State
    menuIsActive: readonly(menuIsActive),
    info,
    connectLinks,
    subcategories,
    categories,
    currentPost: readonly(currentPost),
    pagination: readonly(pagination),
    
    // Actions
    fetchSiteData,
    toggleMenu,
    setCurrentPost,
    setPagination
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'

export const useFinancesStore = defineStore('finances', () => {
  const userInfo = ref([])
  
  async function fetchUserInfo() {
    const userInfo = await getUserInfo()

    console.log(userInfo)
  }
  return { fetchUserInfo }
})

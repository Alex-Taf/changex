import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref([])
  const isLogin = ref(false)

  async function fetchUserInfo() {
    const userInfo = await getUserInfo()

    console.log(userInfo)
  }

  function setIsLogin(bool: boolean) {
    isLogin.value = bool
  }

  return { userInfo, fetchUserInfo, isLogin, setIsLogin }
})

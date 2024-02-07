import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'

export const useUserStore = defineStore('user', () => {
  let userInfo = reactive({})
  const isLogin = ref(false)

  async function fetchUserInfo() {
    const res = await getUserInfo()
    userInfo = res?.data.user
  }

  function setIsLogin(bool: boolean) {
    isLogin.value = bool
  }

  return { userInfo, fetchUserInfo, isLogin, setIsLogin }
})

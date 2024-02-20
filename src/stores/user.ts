import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {}
  }),
  actions: {
    async fetchUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res?.data.user
    }
  }
})

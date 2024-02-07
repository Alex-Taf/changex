import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {}
  }),
  actions: {
    async fetchUserInfo() {
      const res = await getUserInfo()
      // console.log(res)
      this.userInfo = res?.data.user
    }
  }
})

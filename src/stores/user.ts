import { defineStore } from 'pinia'
import { getUserInfo, getLatestAppApk } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    apkUrl: ''
  }),
  actions: {
    async fetchUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res?.data.user
    },
    async getAppLink() {
      const res = await getLatestAppApk()
      this.apkUrl = res?.data.url
    }
  }
})

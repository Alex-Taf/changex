import { defineStore } from 'pinia'
import { getDevices } from '@/api'
import type { TFilterPaginationOptions } from '@/types'

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    deviceList: [] as any,
    page: 1,
    lastPage: 1,
    offset: 1,
    totalCount: 1
  }),
  getters: {
    deviceItemsAll: (state) => state.deviceList
  },
  actions: {
    async fetchDevices(options: TFilterPaginationOptions) {
      const res = await getDevices(options)
      this.deviceList = res?.data.list
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
      console.log(this.deviceList)
    },
    async loadMoreDevices(options: TFilterPaginationOptions) {
      const res = await getDevices(options)
      const newListItems = res?.data.list
      this.deviceList.push(...newListItems)
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
    }
  }
})

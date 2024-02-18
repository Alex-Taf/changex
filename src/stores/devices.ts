import { defineStore } from 'pinia'
import { deleteDevice, editDeviceName, editDeviceComment, getDeviceId, getDevices, getTempToken } from '@/api'
import type { TFilterPaginationOptions } from '@/types'

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    deviceList: [] as any,
    qr: '',
    page: 1,
    lastPage: 1,
    offset: 1,
    totalCount: 1
  }),
  getters: {
    deviceItemsAll: (state) => {
      return state.deviceList.map((item: Record<string, unknown>) => {
        return {
            id: item.deviceId,
            title: item.name,
            device: item.model,
            status: item.status,
            comment: item.comment
        }
      })
    }
  },
  actions: {
    async fetchDeviceById(id: string) {
      const res = await getDeviceId(id)
      return res?.data.device
    },
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
    },
    async loadQR() {
      const res = getTempToken()
      this.qr = res?.qr
    },
    async saveEditDevice(edited: Record<string, unknown>) {
      const id = edited.id as string

      const idx = this.deviceList.findIndex((device) => device.deviceId === id)
      
      const editedOptionsRename = {
        name: edited.name
      }

      const editedOptionsComment = {
        comment: edited.comment
      }

      await editDeviceName(id, editedOptionsRename)
      await editDeviceComment(id, editedOptionsComment)

      const newDevice = await getDeviceId(id)
      
      this.deviceList[idx] = newDevice?.data.device
    },
    async removeDevice(id: string) {
      this.deviceList = this.deviceList.filter((device) => device.deviceId !== id)
      await deleteDevice(id)
    },
  }
})

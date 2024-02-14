import { defineStore } from 'pinia'
import { getAccounts, getAccountCode } from '@/api'
import type { TFilterPaginationOptions } from '@/types'
import { timestampToDatetime } from '@/utils'

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    accountsList: [] as any,
    code: '',
    page: 1,
    lastPage: 1,
    offset: 1,
    totalCount: 1
  }),
  getters: {
    itemsAll: (state) => {
      return state.accountsList.map((item: Record<string, unknown>) => {
        return {
            id: item.tgId,
            account: item.username,
            date: timestampToDatetime(item.timestamp),
            comment: item.comment
        }
      })
    }
  },
  actions: {
    async fetchAccounts(options: TFilterPaginationOptions) {
      const res = await getAccounts(options)
      this.accountsList = res?.data.list
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
      console.log(this.accountsList)
    },
    async loadMoreAccounts(options: TFilterPaginationOptions) {
      const res = await getAccounts(options)
      const newListItems = res?.data.list
      this.accountsList.push(...newListItems)
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
    },
    async getConnectCode() {
        if (this.code === '') {
            const res = await getAccountCode()
            this.code = res?.data.code
        }
    }
  }
})

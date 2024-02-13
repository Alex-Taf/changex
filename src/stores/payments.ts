import { defineStore } from 'pinia'
import { getPayments, getDisputes } from '@/api'
import type { TFilterPaginationOptions } from '@/types'
import { formatter, timestampToDatetime } from '@/utils'

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    paymentsList: [] as any,
    disputsList: [] as any,
    page: 1,
    lastPage: 1,
    offset: 1,
    totalCount: 1
  }),
  getters: {
    paymentsItemsAll: (state) => {
      return state.paymentsList.map((item: Record<string, unknown>) => {
        return {
            id: item.paymentId,
            date: timestampToDatetime(item.timestamp),
            sum: {
                value: formatter.format(item.amount),
                currency: item.currency
            },
            debit: {
                value: formatter.format(item.withdrawalAmount),
                currency: item.currency
            },
            card: {
                type: item.cardType,
                num: item.card.slice(1)
            },
            status: item.status
        }
      })
    },
    disputsItemsAll: (state) => {
      return state.disputsList.map((item: Record<string, unknown>) => {
        return {
            id: item.paymentId,
            date: timestampToDatetime(item.timestamp),
            sum: {
                value: formatter.format(item.amount),
                currency: item.currency
            },
            debit: {
                value: formatter.format(item.withdrawalAmount),
                currency: item.currency
            },
            card: {
                type: item.cardType,
                num: item.card.slice(1)
            },
            status: item.status
        }
      })
    }
  },
  actions: {
    async fetchPayments(options: TFilterPaginationOptions) {
      const res = await getPayments(options)
      this.paymentsList = res?.data.list
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
      console.log(this.paymentsList)
    },
    async loadMorePayments(options: TFilterPaginationOptions) {
      const res = await getPayments(options)
      const newListItems = res?.data.list
      this.paymentsList.push(...newListItems)
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
    },
    async fetchDisputs(options: TFilterPaginationOptions) {
      const res = await getDisputes(options)
      this.disputsList = res?.data.list
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
      console.log(this.disputsList)
    },
    async loadMoreDisputs(options: TFilterPaginationOptions) {
      const res = await getDisputes(options)
      const newListItems = res?.data.list
      this.disputsList.push(...newListItems)
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
    },
  }
})

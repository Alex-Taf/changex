import { defineStore } from 'pinia'
import { getBids, getUserBids, cancelUserBid, takeBid, confirmTakenBid } from '@/api'
import type { TFilterPaginationOptions } from '@/types'
import { formatter, getDifferentTimeStatus, timestampToDatetime, timestampToDatetimeOffset } from '@/utils'

export const useBidsStore = defineStore('bids', {
  state: () => ({
    bidsAllList: [] as any,
    bidsUserList: [] as any,
    loading: true,
    hasItems: true,
    page: 1,
    lastPage: 1,
    offset: 1,
    totalCount: 1
  }),
  getters: {
    bidsItemsAll: (state) => {
      return state.bidsAllList.map((item: Record<string, unknown>) => {
        return {
            id: item.uid,
            method: item.method,
            paymentSum: item.amount,
            sumUSDT: item.amountUSD
        }
      })
    },
    bidsItemsUser: (state) => {
      return state.bidsUserList.map((item: Record<string, unknown>) => {
        return {
            id: item.uid,
            method: item.method,
            requisites: item.requisites,
            paymentSum: item.amount,
            sumUSDT: item.amountUSD,
            date: {
                value: item.takenTimestamp ? timestampToDatetime(item.takenTimestamp as number) : '',
                different: getDifferentTimeStatus(item.takenTimestamp as string)
            },
            status: {
              id: item.uid,
              value: item.status,
              timeout: item.bidTimeoutAfter
            }
        }
      })
    }
  },
  actions: {
    async fetchBids(options: TFilterPaginationOptions) {
      this.showLoading()
      
      const res = await getBids(options)
      
      this.bidsAllList = res?.data.list
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
      if (this.bidsAllList && this.bidsAllList.length === 0) {
        this.hasItems = false
      } else {
        this.hasItems = true
      }

      // this.bidsAllList = [
      //   {
      //     amount: 200,
      //     amountUSD: 2.07,
      //     timestamp: 1713875420298,
      //     method: "Some method",
      //     uid: "0715cb7f-78aa-4f0e-a1f9-6b319c20ea5a"
      //   }
      // ]

      console.log(this.bidsAllList)
    },
    async loadMoreBids(options: TFilterPaginationOptions) {
      this.showLoading()

      const res = await getBids(options)
      const newListItems = res?.data.list
      
      this.bidsAllList.push(...newListItems)
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage

      if (this.bidsAllList.length === 0) {
        this.hasItems = false
      } else {
        this.hasItems = true
      }
    },
    async fetchUserBids(options: TFilterPaginationOptions) {
        this.showLoading()
        
        const res = await getUserBids(options)
        
        this.bidsUserList = res?.data.list
        this.page = res?.data.page
        this.offset = res?.data.offset
        this.totalCount = res?.data.totalCount
        this.lastPage = res?.data.lastPage
        if (this.bidsUserList.length === 0) {
          this.hasItems = false
        } else {
          this.hasItems = true
        }

        // this.bidsUserList = [
        //   {
        //     amount: 200,
        //     amountUSD: 2.07,
        //     timestamp: 1713875420298,
        //     uid: "0715cb7f-78aa-4f0e-a1f9-6b319c20ea5a",
        //     receiptURL: null,
        //     bidTimeoutAfter: 3583732,
        //     requisites: "Перевести на сбер по номеру карты 2200...",
        //     method: "someMethod",
        //     takenTimestamp: 1713875884223,
        //     status: "taken",
        //     exchangeTimestamp: null
        //   }
        // ]
  
        console.log(this.bidsUserList)
    },
    async loadMoreUserBids(options: TFilterPaginationOptions) {
        this.showLoading()
  
        const res = await getBids(options)
        const newListItems = res?.data.list
        
        this.bidsUserList.push(...newListItems)
        this.page = res?.data.page
        this.offset = res?.data.offset
        this.totalCount = res?.data.totalCount
        this.lastPage = res?.data.lastPage
  
        if (this.bidsUserList.length === 0) {
          this.hasItems = false
        } else {
          this.hasItems = true
        }
    },
    async takeBidAction(id: string) {
      const res = await takeBid(id)

      this.bidsAllList = this.bidsAllList.filter((bid) => bid.uid !== id)
    },
    async confirmUserBid(id: string, bid: Record<string, unknown>) {
      const res = await confirmTakenBid(id, bid)

      const idx = this.bidsUserList.findIndex((bid) => bid.uid === id)
      this.bidsUserList[idx] = res?.data.bid
    }, 
    async cancelUserBidByID(id: string) {
      const res = await cancelUserBid(id)
      this.bidsUserList = this.bidsUserList.filter((bid) => bid.uid !== id)
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    }
  }
})

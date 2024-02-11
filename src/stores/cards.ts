import { defineStore } from 'pinia'
import { getCards, addCard, setShutdownCard, setTurnOnCard, getBanks } from '@/api'
import type { TFilterPaginationOptions } from '@/types'

export const useCardsStore = defineStore('cards', {
  state: () => ({
    banks: [
        {
            slug: 'sber',
            name: 'Сбербанк'
        },
        {
            slug: 'raiff',
            name: 'Райфайзен'
        },
        {
            slug: 'tinkoff',
            name: 'Тинькофф'
        },
        {
            slug: 'alpha',
            name: 'Альфбанк'
        }
    ],
    bankList: [],
    cardsList: [] as any,
    page: 1,
    lastPage: 1,
    offset: 1,
    totalCount: 1
  }),
  getters: {
    itemsAll: (state) => {
        return state.cardsList.map((item) => {
            const switchStatus = item.status === 'active' ? true : false
            const bankName = state.banks.find((bank) => bank.slug === item.bank).name
            const pan = item.maskedPan.slice(1)

            return {
                id: item.uid,
                card: {
                    type: item.type,
                    num: pan
                },
                bank: {
                    slug: item.bank,
                    name: bankName
                },
                device: item.deviceName,
                comment: item.comment,
                status: item.status,
                switch: {
                    cardUid: item.uid,
                    isSwitched: switchStatus
                }
            }
        })
    },
    bankItems: (state) => state.bankList
  },
  actions: {
    async checkCard(search: string) {
        const res = await getCards({ search })
        return res?.data.list[0] ? true : false 
    },
    async fetchCards(options: TFilterPaginationOptions) {
      const res = await getCards(options)
      this.cardsList = res?.data.list
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
      console.log(this.cardsList)
    },
    async loadMoreCards(options: TFilterPaginationOptions) {
      const res = await getCards(options)
      const newListItems = res?.data.list
      this.cardsList.push(...newListItems)
      this.page = res?.data.page
      this.offset = res?.data.offset
      this.totalCount = res?.data.totalCount
      this.lastPage = res?.data.lastPage
    },
    async createCard(newCard: Record<string, unknown>) {
        const createdCard = {
            bank: newCard.bank.select,
            pan: newCard.cardNum.replace(/\s/g, ''),
            deviceId: newCard.device.select,
            comment: newCard.comment
        }
        const res = await addCard(createdCard)
        console.log(res?.data.card)
        this.cardsList.unshift(res?.data.card)
    },
    async toggleCard(uid: string, isSwitched: boolean) {
        if (isSwitched) {
            const res = await setShutdownCard(uid)

            if (res?.status === 200) {
                this.cardsList.find((card) => card.uid === uid).status = 'stopped'
            }
        } else {
            this.cardsList.find((card) => card.uid === uid).status = 'connect'
            const res = await setTurnOnCard(uid)

            if (res?.status === 200) {
                this.cardsList.find((card) => card.uid === uid).status = 'active'
            }
        }
    },
    async fetchBanks() {
        const res = await getBanks()
        this.bankList = res?.data.banks
        // this.bankList = Object.entries(banks).map(([key, value]) => {
        //     const newItem = {} as any
        //     newItem[key] = value
        //     return newItem
        // })
    }
  }
})

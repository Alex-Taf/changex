import { defineStore } from 'pinia'
import { getDashboard, getDashboardDate, getDashboardDateRange, getDashboardChart, getDashboardChartDate } from '@/api'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboard: {},
    chart: {},
    loading: true,
  }),
  getters: {},
  actions: {
    async fetchChart() {
        this.showLoading()

        const res = await getDashboardChart()
        this.chart = res?.data.chart[0]
    },
    async fetchDashboard() {
        this.showLoading()

        const res = await getDashboard()
        this.dashboard = res?.data.dashboard
    },
    async fetchChartForDate(date: Date) {
        this.showLoading()

        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1; // Months start at 0!
        const dd = date.getDate();

        const dateString = dd.toString().padStart(2, '0') + '-' + mm.toString().padStart(2, '0') + '-' + yyyy

        const res = await getDashboardChartDate(dateString)
        this.chart = res?.data.chart[0]
    },
    async fetchDashboardForDate(date: Date) {
        this.showLoading()

        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1; // Months start at 0!
        const dd = date.getDate();

        const dateString = dd.toString().padStart(2, '0') + '-' + mm.toString().padStart(2, '0') + '-' + yyyy

        const res = await getDashboardDate(dateString)
        this.dashboard = res?.data.dashboard
    },
    async fetchDashboardForDateRange(dateStart: Date, dateEnd: Date) {
        this.showLoading()

        const yyyyStart = dateStart.getFullYear()
        const mmStart = dateStart.getMonth() + 1 // Months start at 0!
        const ddStart = dateStart.getDate()

        const dateStringStart = ddStart.toString().padStart(2, '0') + '-' + mmStart.toString().padStart(2, '0') + '-' + yyyyStart

        const yyyyEnd = dateEnd.getFullYear()
        const mmEnd = dateEnd.getMonth() + 1 // Months start at 0!
        const ddEnd = dateEnd.getDate()

        const dateStringEnd = ddEnd.toString().padStart(2, '0') + '-' + mmEnd.toString().padStart(2, '0') + '-' + yyyyEnd

        const res = await getDashboardDate(dateStringStart, dateStringEnd)
        this.dashboard = res?.data.dashboard
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    }
  }
})

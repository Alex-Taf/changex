import { $host, $authHost } from '@/http'
import type { ILocalUserInfo } from './index.interface'
import { setCookie, deleteCookie } from '@/utils'
import type { TFilterPaginationOptions } from '@/types'

const _writeLocalUserInfo = (info: ILocalUserInfo): void => {
    Object.entries(info).map(([key, value]) => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key)
        }

        localStorage.setItem(key, value)
    })
}

const _purgeLocalUserInfo = () => {
    const fields = new Set([
        'accessToken',
        'accessTokenExpireAt',
        'refreshToken',
        'refreshTokenExpireAt',
        'role',
        'status',
        'tokenType'
    ])

    for (const value of fields) {
        localStorage.removeItem(value)
    }
}

const _refreshToken = async () => {
    if (!localStorage.getItem('refreshToken')) {
        return
    }

    const res = await $authHost.post('/auth/refresh', {})
    _writeLocalUserInfo(res.data)

    return res
}

export const login = async (token: string) => {
    const res = await $host.post('/auth/login', { token })
    _writeLocalUserInfo(res.data)

    setCookie('changexlogin', 'true')

    return res
}

export const logout = async () => {
    const res = await $authHost.post('/auth/logout', {})

    if (res.status === 200) {
        _purgeLocalUserInfo()
        deleteCookie('changexlogin')
    }
}

export const getTempToken = async () => {
    try {
        return await $authHost.post('/auth/getTempToken', {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/auth/getTempToken', {})
                }
            } else {
                return
            }
        }
    }
}

export const getUserInfo = async () => {
    try {
        return await $authHost.post('/me', {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/me', {})
                }
            } else {
                return
            }
        }
    }
}

export const getFinancesStory = async (options: TFilterPaginationOptions) => {
    try {
        return await $authHost.post('/balance/history', { ...options })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/balance/history', { ...options })
                }
            } else {
                return
            }
        }
    }
}

export const getCards = async (options: TFilterPaginationOptions) => {
    try {
        return await $authHost.post('/cards/list', { ...options })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/cards/list', { ...options })
                }
            } else {
                return
            }
        }
    }
}

export const getCardByUID = async (uid: string) => {
    try {
        return await $authHost.post(`/cards/${uid}/info`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/cards/${uid}/info`, {})
                }
            } else {
                return
            }
        }
    }
}

export const addCard = async (data: Record<string, unknown>) => {
    try {
        return await $authHost.post('/cards/add', { ...data })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/cards/add', { ...data })
                }
            } else {
                return
            }
        }
    }
}

export const setShutdownCard = async (cardUid: string) => {
    try {
        return await $authHost.post(`/cards/${cardUid}/off`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/cards/${cardUid}/off`, {})
                }
            } else {
                return
            }
        }
    }
}

export const setTurnOnCard = async (cardUid: string) => {
    try {
        return await $authHost.post(`/cards/${cardUid}/on`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/cards/${cardUid}/on`, {})
                }
            } else {
                return
            }
        }
    }
}

export const editCard = async (uid: string, onSaveCard: Record<string, unknown>) => {
    try {
        return await $authHost.post(`/cards/${uid}/edit`, { ...onSaveCard })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/cards/${uid}/edit`, { ...onSaveCard })
                }
            } else {
                return
            }
        }
    }
}

export const deleteCard = async (uid: string) => {
    try {
        return await $authHost.post(`/cards/${uid}/trash`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/cards/${uid}/trash`, {})
                }
            } else {
                return
            }
        }
    }
}

export const getBanks = async () => {
    try {
        return await $host.get('/server/banks')
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $host.get('/server/banks')
                }
            } else {
                return
            }
        }
    }
}

export const getPayments = async (options: TFilterPaginationOptions) => {
    try {
        return await $authHost.post('/payments/list', { ...options })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/payments/list', { ...options })
                }
            } else {
                return
            }
        }
    }
}

export const getDisputes = async (options: TFilterPaginationOptions) => {
    try {
        return await $authHost.post('/disputes/list', { ...options })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/disputes/list', { ...options })
                }
            } else {
                return
            }
        }
    }
}

export const getDeviceId = async (id: string) => {
    try {
        return await $authHost.post(`/devices/${id}/info`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/devices/${id}/info`, {})
                }
            } else {
                return
            }
        }
    }
}

export const getDevices = async (options: TFilterPaginationOptions) => {
    try {
        return await $authHost.post('/devices/list', { ...options })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/devices/list', { ...options })
                }
            } else {
                return
            }
        }
    }
}

export const editDeviceName = async (id: string, onSaveOptions: Record<string, unknown>) => {
    try {
        return await $authHost.post(`/devices/${id}/rename`, { ...onSaveOptions })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/devices/${id}/rename`, { ...onSaveOptions })
                }
            } else {
                return
            }
        }
    }
}

export const editDeviceComment = async (id: string, onSaveOptions: Record<string, unknown>) => {
    try {
        return await $authHost.post(`/devices/${id}/edit`, { ...onSaveOptions })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/devices/${id}/edit`, { ...onSaveOptions })
                }
            } else {
                return
            }
        }
    }
}

export const deleteDevice = async (id: string) => {
    try {
        return await $authHost.post(`/devices/${id}/remove`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/devices/${uid}/remove`, {})
                }
            } else {
                return
            }
        }
    }
}

export const getAccountUID = async (uid: string) => {
    try {
        return await $authHost.post(`/tg/${uid}/info`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/tg/${uid}/info`, {})
                }
            } else {
                return
            }
        }
    }
}


export const getAccounts = async (options: TFilterPaginationOptions) => {
    try {
        return await $authHost.post('/tg/list', { ...options })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/tg/list', { ...options })
                }
            } else {
                return
            }
        }
    }
}

export const getAccountCode = async () => {
    try {
        return await $authHost.post('/tg/generateCode', {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post('/tg/generateCode', {})
                }
            } else {
                return
            }
        }
    }
}

export const editAccount = async (uid: string, onSaveAccount: Record<string, unknown>) => {
    try {
        return await $authHost.post(`/tg/${uid}/edit`, { ...onSaveAccount })
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/tg/${uid}/edit`, { ...onSaveAccount })
                }
            } else {
                return
            }
        }
    }
}

export const deleteAccount = async (uid: string) => {
    try {
        return await $authHost.post(`/tg/${uid}/remove`, {})
    } catch (error) {
        if (error.response.data.code === 'jwt_error') {
            if (localStorage.getItem('refreshToken')) {
                const updateRes = await _refreshToken()
                if (updateRes?.status === 200) {
                    return await $authHost.post(`/tg/${uid}/remove`, {})
                }
            } else {
                return
            }
        }
    }
}

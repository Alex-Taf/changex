import { $host, $authHost } from '@/http'
import type { ILocalUserInfo } from './index.interface'
import { setCookie, deleteCookie } from '@/utils'

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

    setCookie('changexlogin', 'true', { secure: true })

    return res
}

export const logout = async () => {
    const res = await $authHost.post('/auth/logout', {})

    if (res.status === 200) {
        _purgeLocalUserInfo()
        deleteCookie('changexlogin')
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

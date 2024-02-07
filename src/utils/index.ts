import type { IUseDeviceWidth, IGetNavItemStroke, ICookieOptions } from './index.interface'

export const formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2
})

export const getNavItemStroke: IGetNavItemStroke = (navItemRouteName, currentRouteName, colors) => {
    return navItemRouteName === currentRouteName ? colors.active : colors.default
}

// cw - document.documentElement.clientWidth - device screen app blank width
export const useDeviceWidth: IUseDeviceWidth = () => ({
    getWidth: () => document.documentElement.clientWidth,
    isEqual: (cw, px) => px === cw,
    lessThan: (cw, px) => cw <= px,
    moreThan: (cw, px) => cw >= px,
    between: (cw, pxMin, pxMax) => cw >= pxMin && cw <= pxMax
})

export const setCookie = (name: string, value: string, options: ICookieOptions) => {
    options = {
        path: '/',
        ...options
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (const optionKey in options) {
        updatedCookie += '; ' + optionKey
        const optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue
        }
    }

    document.cookie = updatedCookie
}

export const deleteCookie = (name: string) => {
    setCookie(name, '', {
        'max-age': -1
    })
}

export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export const timestampToDatetime = (timestamp: number): string => {
    const dateFormat = new Date(timestamp)
    //const formattedDate = `${dateFormat.getDay()}.${dateFormat.getMonth() + 1}.${dateFormat.getFullYear()} ${dateFormat.getHours()}:${dateFormat.getMinutes()}`
    const formatter = new Intl.DateTimeFormat('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        minute: '2-digit',
        hour: '2-digit'
    })

    const formattedDate = formatter.format(dateFormat)

    return formattedDate
}

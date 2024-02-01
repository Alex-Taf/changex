import type { IUseDeviceWidth, IGetNavItemStroke } from "./index.interface";

export const formatter = new Intl.NumberFormat("ru", {
    minimumFractionDigits: 2
});

export const getNavItemStroke: IGetNavItemStroke = (navItemRouteName, currentRouteName, colors) => {
    return navItemRouteName === currentRouteName ? colors.active : colors.default
}

// cw - document.documentElement.clientWidth - device screen app blank width
export const useDeviceWidth: IUseDeviceWidth = () => ({
    getWidth: () => document.documentElement.clientWidth,
    isEqual: (cw, px) => px === cw,
    lessThan: (cw, px) => cw <= px,
    moreThan: (cw, px) => cw >= px,
    between: (cw, pxMin, pxMax) =>
        cw >= pxMin && cw <= pxMax   
})

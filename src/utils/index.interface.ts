export interface IGetNavItemStroke {
    (navItemRouteName: string, currentRouteName: string, colors: { default: string, active: string }): string
}

export interface IUseDeviceWidth {
    (): {
        getWidth: () => number,
        isEqual: (cw: number, px: number) => boolean,
        lessThan: (cw: number, px: number) => boolean,
        moreThan: (cw: number, px: number) => boolean,
        between: (cw: number, pxMin: number, pxMax: number) => boolean
    }
}

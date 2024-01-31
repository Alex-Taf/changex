export const formatter = new Intl.NumberFormat("ru", {
    minimumFractionDigits: 2
});

export const getNavItemStroke = (navItemRouteName: string, currentRouteName: string, colors: { default: string, active: string }) => {
    return navItemRouteName === currentRouteName ? colors.active : colors.default
}
